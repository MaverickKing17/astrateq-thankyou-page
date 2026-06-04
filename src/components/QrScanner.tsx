/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Camera, X, AlertCircle, Sparkles, ShieldCheck, Loader2 } from 'lucide-react';
import jsQR from 'jsqr';

interface QrScannerProps {
  onScanSuccess: (data: { id: string; email?: string; year?: string; make?: string; model?: string }) => void;
  onClose: () => void;
}

export default function QrScanner({ onScanSuccess, onClose }: QrScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isInitializing, setIsInitializing] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Attempt camera activation
    let active = true;

    async function startCamera() {
      try {
        setIsInitializing(true);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
        });
        
        if (!active) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true'); // Required for iOS Safari
          videoRef.current.play();
        }
        setHasPermission(true);
        setIsInitializing(false);
      } catch (err: any) {
        if (!active) return;
        console.error('Camera initialization error:', err);
        setHasPermission(false);
        setIsInitializing(false);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setErrorMsg('Camera access was denied. Please update your browser permissions to allow scanning.');
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setErrorMsg('No native camera hardware detected on this device.');
        } else {
          setErrorMsg(`Unable to tap active camera stream: ${err.message || 'unknown error'}`);
        }
      }
    }

    startCamera();

    return () => {
      active = false;
      cleanupVideo();
    };
  }, []);

  const cleanupVideo = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleVideoPlaying = () => {
    if (animationFrameRef.current) return;
    
    const scanFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const decoded = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (decoded && decoded.data) {
            const rawText = decoded.data.trim();
            let parsedResult: { id: string; email?: string; year?: string; make?: string; model?: string } = {
              id: rawText
            };

            // Attempt telemetry JSON extraction
            try {
              if (rawText.startsWith('{') && rawText.endsWith('}')) {
                const parsed = JSON.parse(rawText);
                if (parsed.id) {
                  parsedResult = {
                    id: parsed.id,
                    email: parsed.email || undefined,
                    year: parsed.year || undefined,
                    make: parsed.make || undefined,
                    model: parsed.model || undefined
                  };
                }
              }
            } catch (e) {
              // Not structured JSON, treat as raw ID text
            }

            cleanupVideo();
            onScanSuccess(parsedResult);
            return;
          }
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(scanFrame);
    };

    animationFrameRef.current = requestAnimationFrame(scanFrame);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="bg-slate-950/90 border border-astrateq-cyan/30 rounded-xl overflow-hidden p-5 space-y-4 relative"
    >
      {/* Background Cyber grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

      <div className="flex items-center justify-between relative z-10 border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-astrateq-cyan animate-ping flex-shrink-0"></div>
          <div>
            <h3 className="text-xs font-bold font-mono text-white tracking-wider uppercase flex items-center">
              CANADA SENTINEL RADAR
            </h3>
            <p className="text-[10px] text-slate-400 font-sans tracking-wide">
              Secure Local Decryptor Room
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white transition-all focus:outline-none"
          title="Close Scanner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="relative z-10">
        {isInitializing && (
          <div className="aspect-[4/3] bg-black/60 rounded-lg flex flex-col items-center justify-center border border-white/5 space-y-2">
            <Loader2 className="w-8 h-8 text-astrateq-cyan animate-spin" />
            <span className="text-[10px] font-mono text-slate-300">ENGAGING OPTICAL CAMERA MATRIX...</span>
          </div>
        )}

        {hasPermission === false && (
          <div className="aspect-[4/3] bg-red-950/20 border border-red-500/20 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">OPTICAL HARDWARE OFFLINE</h4>
              <p className="text-xs text-white max-w-sm leading-relaxed font-medium">
                {errorMsg}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-3 py-1.5 bg-white/5 border border-white/10 text-white rounded-md text-[10px] font-mono hover:bg-white/10 transition-all font-bold"
            >
              RETAPS DEPLOYMENT MATRIX (RELOAD)
            </button>
          </div>
        )}

        {hasPermission === true && (
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-astrateq-cyan/20 bg-black shadow-[0_0_20px_rgba(34,211,238,0.15)] group">
            {/* Real camera video */}
            <video
              ref={videoRef}
              onPlaying={handleVideoPlaying}
              className="w-full h-full object-cover select-none"
            />
            {/* Invisible detector canvas */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Cyber Scanning HUD Reticle overlays */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none select-none">
              {/* Corner brackets */}
              <div className="flex justify-between">
                <div className="w-4 h-4 border-t-2 border-l-2 border-astrateq-cyan"></div>
                <div className="w-4 h-4 border-t-2 border-r-2 border-astrateq-cyan"></div>
              </div>
              
              {/* Animated Scan Line */}
              <div className="absolute left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-astrateq-cyan to-transparent animate-laser shadow-[0_0_8px_#22d3ee]"></div>

              {/* Central box placeholder visual target */}
              <div className="self-center flex flex-col items-center justify-center p-4 border border-dashed border-white/20 w-44 h-44 rounded-md">
                <span className="text-[8px] font-mono tracking-widest text-[#22d3ee] font-bold bg-slate-950/80 px-1.5 py-0.5 rounded border border-astrateq-cyan/20">
                  ALIGN QR CODE
                </span>
              </div>

              <div className="flex justify-between items-end">
                <div className="w-4 h-4 border-b-2 border-l-2 border-astrateq-cyan"></div>
                <div className="w-4 h-4 border-b-2 border-r-2 border-astrateq-cyan"></div>
              </div>
            </div>

            {/* Local telemetry stream footer watermark overlay */}
            <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md border border-white/5 py-1.5 px-3 rounded-md flex justify-between items-center pointer-events-none select-none">
              <span className="text-[8px] font-mono text-white flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                ACTIVE FEED (ENVIRONMENT)
              </span>
              <span className="text-[8px] font-mono text-white/60">
                TEMP: NOMINAL (-40°C COMPLIANT)
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex items-start space-x-2.5 relative z-10">
        <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
        <div className="text-[10.5px] text-white leading-normal font-sans font-medium">
          <span className="text-white font-bold">Privacy Clearance:</span> Deciphering is performed 100% locally in your Canadian browser sandbox. No active camera telemetry, frames, or biometric elements are ever shipped to clouds.
        </div>
      </div>
    </motion.div>
  );
}
