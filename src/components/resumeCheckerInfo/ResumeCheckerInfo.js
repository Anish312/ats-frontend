import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ResumeCheckerInfo.css";
import "./ResumeCheckerInfo.scss";

gsap.registerPlugin(ScrollTrigger);

function ResumeCheckerInfo() {
  const containerRef = useRef(null);
  const letterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the entire section when it enters viewport
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 80,
        delay: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // when top of section hits 80% viewport
          toggleActions: "play none none reverse",
        },
      });

      // Animate the letter-image
      gsap.from(letterRef.current, {
        scale: 0.8,
        rotate: -15,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.4,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Floating effect after animation
      gsap.to(letterRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play pause resume pause", // stops float when scrolled out
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="checker-container" ref={containerRef}>
      <div className="checker-wrapper">
        {/* Left side illustration */}
        <div className="checker-left">
          <div className="letter-image" ref={letterRef}>
            <div className="animated-mail">
              <div className="back-fold"></div>
              <div className="letter">
                <div className="letter-border"></div>
                <div className="letter-title"></div>
                <div className="letter-context"></div>
                <div className="letter-stamp">
                  <div className="letter-stamp-inner"></div>
                </div>
              </div>
              <div className="top-fold"></div>
              <div className="body"></div>
              <div className="left-fold"></div>
            </div>
            <div className="shadow"></div>
          </div>
        </div>

        {/* Right side content */}
        <div className="checker-right">
          <h2>
            Resume Checker forms <br />
            its ATS score with a two-tier system
          </h2>
          <p className="description">
            When you’re applying for a job, there’s a high chance your resume
            will be screened through an applicant tracking system way before it
            finds its way on a recruiter’s screen. ATS helps hiring managers
            find the right candidates by searching for keywords and adding the
            resume to a database.
          </p>
          <p className="description">
            That’s why the success of your resume is highly dependent on how
            optimized your resume is for the job you’re applying for, the resume
            template you’re using, and what skills and keywords you have
            included.
          </p>

          <div className="point">
            <div className="circle">1</div>
            <div>
              <h3>The proportion of content we can interpret</h3>
              <p>
                Similar to an ATS, we analyze and attempt to comprehend your
                resume. The greater our understanding of your resume, the more
                effectively it aligns with a company’s ATS.
              </p>
            </div>
          </div>

          <div className="point">
            <div className="circle">2</div>
            <div>
              <h3>What our checker identifies</h3>
              <p>
                Although an ATS doesn’t look for spelling mistakes and poorly
                crafted content, recruitment managers certainly do. The second
                part of our score is based on the quantifiable achievements you
                have in your resume and the quality of the written content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeCheckerInfo;
