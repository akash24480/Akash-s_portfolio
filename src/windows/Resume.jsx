import { WindowControlls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { useWindowStore } from '#store/window'
import { Download } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import {Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  const { windows } = useWindowStore();
  const data = windows.resume?.data;
  const isOpen = windows.resume?.isOpen; // Get open state
  const containerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(null);

  // Default to hardcoded resume if no data provided
  const resumeFile = data?.href || "files/Akash_kumar.pdf";
  const resumeName = data?.name || "Resume.pdf";

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Mobile: px-3 (12px * 2 = 24px)
            // We use a small timeout to ensure the window is rendered and has width
            setTimeout(() => {
                if(containerRef.current) {
                    const width = containerRef.current.offsetWidth - 24;
                    setPageWidth(width);
                }
            }, 100);
        } else {
            // Desktop: Don't set width, let it be natural size
            setPageWidth(null);
        }
      }
    };

    if (isOpen) {
        updateWidth();
    }
    
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [isOpen]); // Re-run when window opens

  return (
    <>

    <div id='window-header' className='hidden md:flex'>
        <WindowControlls target="resume" />
        <h2>{resumeName}</h2>

        <a href={resumeFile} download className='cursor-pointer' title='Download Resume'>
            <Download className='icon' />
        </a>
    </div>

    <div id='mobile-window-header' className='flex justify-between items-center px-3 pb-3 md:hidden relative z-50 mt-16'>
      <div className='flex-1 flex items-center gap-2'>
        <WindowControlls target="resume" />
      </div>
      <p className="flex-[1.5] text-lg font-georama text-black line-clamp-1">{resumeName}</p>
      <a href={resumeFile} download className='cursor-pointer' title='Download Resume'>
        <Download className='w-5 h-5' />
      </a>
    </div>

    <div ref={containerRef} className='px-3 py-6 md:p-6 h-full overflow-y-auto'>
        <Document file={resumeFile}>
            <Page 
                pageNumber={1} 
                width={pageWidth || undefined} 
                renderTextLayer 
                renderAnnotationLayer 
            />
        </Document>
    </div>



    </>
  )
}

const ResumeWindow = WindowWrapper(Resume, 'resume')

export default ResumeWindow