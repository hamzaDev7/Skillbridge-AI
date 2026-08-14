export default function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const isPrivacy = type === 'privacy';

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto bg-card border rounded-2xl p-8 md:p-12 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          {isPrivacy ? "Privacy Policy" : "Terms and Conditions"}
        </h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          
          {isPrivacy ? (
            <>
              <p>
                At SkillBridge AI, accessible from skillbridge.ai, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SkillBridge AI and how we use it.
              </p>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Information We Collect</h2>
              <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <p>
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </p>
              <p>
                When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
              </p>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
            </>
          ) : (
            <>
              <p>
                Welcome to SkillBridge AI!
              </p>
              <p>
                These terms and conditions outline the rules and regulations for the use of SkillBridge AI's Website, located at skillbridge.ai.
              </p>
              <p>
                By accessing this website we assume you accept these terms and conditions. Do not continue to use SkillBridge AI if you do not agree to take all of the terms and conditions stated on this page.
              </p>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-4">License</h2>
              <p>
                Unless otherwise stated, SkillBridge AI and/or its licensors own the intellectual property rights for all material on SkillBridge AI. All intellectual property rights are reserved. You may access this from SkillBridge AI for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <h2 className="text-xl font-bold text-foreground mt-8 mb-4">User Content</h2>
              <p>
                In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant SkillBridge AI a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
              </p>
              <p>
                Your Content must be your own and must not be invading any third-party's rights. SkillBridge AI reserves the right to remove any of Your Content from this Website at any time without notice.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
