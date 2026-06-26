import React from 'react';

export type AppIconName = 
  | 'instagram' 
  | 'youtube' 
  | 'linkedin' 
  | 'x' 
  | 'bluesky' 
  | 'pinterest' 
  | 'threads' 
  | 'facebook' 
  | 'dropbox'
  | 'drive'
  | 'zapier'
  | 'tiktok';

export const AppIcon = ({ name, className }: { name: AppIconName, className?: string }) => {
  switch (name) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2">
              <stop offset="0%" stopColor="#feda75" />
              <stop offset="25%" stopColor="#fa7e1e" />
              <stop offset="50%" stopColor="#d62976" />
              <stop offset="75%" stopColor="#962fbf" />
              <stop offset="100%" stopColor="#4f5bd5" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-grad)" />
          <rect x="6" y="6" width="12" height="12" rx="3.5" stroke="white" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.8" stroke="white" strokeWidth="1.8" />
          <circle cx="16.5" cy="7.5" r="1.1" fill="white" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M21.582 6.186a2.67 2.67 0 0 0-1.884-1.895C18.04 3.843 12 3.843 12 3.843s-6.04 0-7.698.448a2.67 2.67 0 0 0-1.884 1.895C1.97 7.854 1.97 12 1.97 12s0 4.146.448 5.814a2.67 2.67 0 0 0 1.884 1.895C6.04 20.157 12 20.157 12 20.157s6.04 0 7.698-.448a2.67 2.67 0 0 0 1.884-1.895C22.03 16.146 22.03 12 22.03 12s0-4.146-.448-5.814z" fill="#FF0000"/>
          <path d="M9.98 15.5l6.52-3.5-6.52-3.5v7z" fill="#FFFFFF"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="24" height="24" rx="4" fill="#0A66C2"/>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" fill="#FFFFFF"/>
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="24" height="24" rx="4" fill="#000000"/>
          <path d="M14.258 10.152L21 2h-1.6l-5.87 6.67L8.78 2H3l7.08 10.08L3 22h1.6l6.2-7.05L15.93 22H21l-7.46-10.63H14.26zM11.37 13.562l-.84-.1.353-.404L3.896 4h2.46l4.28 5.96.84.1-.353.404L15.65 19.58h-2.46l-4.28-5.96z" fill="#FFFFFF"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="12" cy="12" r="11" fill="#1877F2"/>
          <path d="M14.5 12h-2v7h-3v-7h-2v-2.5h2V7.75c0-1.8 1.1-2.75 2.65-2.75h1.85v2.5h-1.35c-.85 0-1.15.4-1.15 1.15V9.5h2.5L14.5 12z" fill="#FFFFFF"/>
        </svg>
      );
    case 'bluesky':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M12 10.8c-1.3-3.4-4.8-6.8-7.7-6.8-3.3 0-3.3 3-3.3 3.8 0 2.2 2 4.4 5.3 5.3-4.2.3-6.1 2.3-6.1 4.3 0 2.3 3.7 4.6 7 2.8.5-.3 3.5-3 4.8-6 1.3 3 4.3 5.7 4.8 6 3.3 1.8 7-.5 7-2.8 0-2-1.9-4-6.1-4.3 3.3-.9 5.3-3.1 5.3-5.3 0-.8 0-3.8-3.3-3.8-2.9 0-6.4 3.4-7.7 6.8z" fill="#0085ff"/>
        </svg>
      );
    case 'pinterest':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="12" cy="12" r="11" fill="#E60023"/>
          <path d="M12 4.5c-3.8 0-5.9 2.6-5.9 5.5 0 1.5.6 2.8 1.5 3.3.2.1.3.1.4-.2l.2-.9c.1-.2 0-.3-.1-.5-.4-.6-.7-1.4-.7-2.2 0-2.4 1.8-4.5 4.6-4.5 2.5 0 4.1 1.7 4.1 3.9 0 2.6-1.2 4.8-2.9 4.8-1 0-1.7-.8-1.5-1.8.3-1.1.8-2.3.8-3.1 0-.7-.4-1.4-1.2-1.4-1 0-1.7 1-1.7 2.4 0 .9.3 1.5.3 1.5s-1 4.2-1.2 5.1c-.2.9-.1 2 .1 2.8.1.1.2.1.2.1.3-.4.8-1 1-1.9l.5-2.2c.4.9 1.7 1.6 3 1.6 3.9 0 6.6-3.4 6.6-8.1 0-3.5-2.8-6.1-6.8-6.1z" fill="#FFFFFF"/>
        </svg>
      );
    case 'threads':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="24" height="24" rx="4" fill="#000000"/>
          <path d="M15.4 12c.1-.4.1-.8.1-1.2 0-2.2-1.6-3.8-3.6-3.8-2 0-3.6 1.6-3.6 3.8s1.6 3.8 3.6 3.8c.8 0 1.4-.2 1.9-.6.2.2.3.5.3.8 0 .8-.8 1.4-1.9 1.4-2.5 0-3.7-1.2-4.1-2.9h-1.6c.3 2.6 2.1 4.3 5.7 4.3 2 0 3.5-1 3.5-2.8 0-.9-.5-1.7-1.2-2.1.5-.6.9-1.3.9-2.1zm-3.5 2.4c-1.1 0-2-.9-2-2.4 0-1.5.9-2.4 2-2.4 1.1 0 2 .9 2 2.4 0 1.5-.9 2.4-2 2.4z" fill="#FFFFFF"/>
        </svg>
      );
    case 'dropbox':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
          <g transform="translate(2 2) scale(0.8)">
            <path d="M12 2.3l-5.6 3.6 4.3 3.2L5.2 12 1.3 9.4 6.9 5.8 1.3 2.3 6.9-1.3 12 2.3zm0 0l5.6 3.6-4.3 3.2L18.8 12l3.9-2.6-5.6-3.6 5.6-3.5-5.6-3.6L12 2.3zm-6.8 10.9l5.6 3.5L6.5 19.9 1.3 16.3l3.9-3.1zm13.6 0l-5.6 3.5 4.3 3.2 5.2-3.6-3.9-3.1zM12 17.6l-4.7-3.1-1.6 1.3 6.3 4.2 6.3-4.2-1.6-1.3-4.7 3.1z" fill="#0061FF" />
          </g>
        </svg>
      );
    case 'drive':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
          <g transform="translate(1 1) scale(0.9)">
            <path d="M15.4 3h-6.8L2.7 13.2h6.8l5.9-10.2z" fill="#FFC107"/>
            <path d="M8.6 3L2.7 13.2l3.4 5.9h6.8l-4.3-7.4z" fill="#1976D2"/>
            <path d="M21.3 13.2l-3.4-5.9L12 19.1h6.8l2.5-5.9z" fill="#4CAF50"/>
          </g>
        </svg>
      );
    case 'zapier':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="24" height="24" rx="4" fill="#FF4A00"/>
          <path d="M14 6H9l-2 7h3l-1 5 6-7h-3l2-5z" fill="#FFFFFF"/>
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="24" height="24" rx="4" fill="#000000"/>
          <path d="M12.5 3h1.8c.2 1.3 1 2.3 2.2 2.7v2c-1 0-1.8-.4-2.5-1v5.8c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4v2.2c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8V3z" fill="#FFFFFF"/>
        </svg>
      );
    default:
      return null;
  }
}
