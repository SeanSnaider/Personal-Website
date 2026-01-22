import TextType from './reactbits/TextType';
import FloatingLines from './reactbits/FloatingLines';
import TiltedCard from './reactbits/TiltedCard';
import GooeyNav from './reactbits/GooeyNav';
import selfImage from './self.jpeg';
import resume from '../public/resume for website.pdf';

/* items for GooeyNav */
const items: { label: string; href: string }[] = [
      { label: "Home", href: "#hero" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ];

export function Hero() {
  return (
    /* Hero Section with Floating Lines and Typing Text Effect, text is centered */
    <section className="w-full min-h-screen bg-black relative">
        <div className="w-full h-screen absolute top-0 left-0">
          <FloatingLines
            linesGradient={['#e9e5f1', '#082d9c', '#47D1FF']}
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
                        "I'm a progressive guitarist and music lover",
                        "I'm a speedcuber and puzzle lover",
                        "I'm a TA for Object Oriented Programming"
                  ]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
                </div>
              </div>
            </div>
        </div>

      {/* seperate component which will have the seperate pages */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 pb-8">
        <GooeyNav
          items={items}
          particleCount={0}
          timeVariance={400}
          particleR={0}
        />
      </div>
    </section>
  );
}