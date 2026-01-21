import TextType from './reactbits/TextType';
import FloatingLines from './reactbits/FloatingLines';
import TiltedCard from './reactbits/TiltedCard';
import selfImage from './self.jpeg';

export function Hero() {
  return (
    /* Hero Section with Floating Lines and Typing Text Effect, text is centered */
    <section id="hero" className="w-full min-h-screen bg-black relative">
        <div className="w-full h-screen absolute top-0 left-0">
          <FloatingLines
            linesGradient={['#e9e5f1', '#7c3aed', '#a78bfa']}
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[10, 7, 5]}
            lineDistance={[8, 6, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={false}
            parallax={true}
          />
        </div>
        {/* Container that holds both image and text side-by-side */}
        <div className="absolute centered w-full h-full flex items-center justify-center px-15">
          <div className="flex items-center gap-45">
            {/* Image on the left */}
            <div>
              <TiltedCard
                imageSrc={selfImage}
                altText="Sean"
                captionText="Sean Snaider"
                containerHeight="450px"
                containerWidth="450px"
                imageHeight="450px"
                imageWidth="450px"
                rotateAmplitude={0}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">
                    {/* leave this shit empty */}
                  </p>
                }
              />
            </div>

            {/* Text on the right with a little box behind it for visibility*/}
            <div className="bg-transparent p-6 rounded-lg shadow-2xl">
              <div className="flex flex-col text-white text-left">
                <p className="text-5xl mb-4 font-bold shadow-text">
                  Hi, my name is Sean
                </p>
                <TextType
                  text={["I'm a CS & Software student @ Northeastern University",
                        "I'm a progressive guitarist and music enthusiast",
                        "I'm a speedcuber and puzzle lover",
                        "I'm a TA for Object Oriented Programming"
                  ]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
                <a
                  href="/resume.pdf"
                  download
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors w-fit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
                </div>
              </div>
            </div>
        </div>

    </section>
  );
}