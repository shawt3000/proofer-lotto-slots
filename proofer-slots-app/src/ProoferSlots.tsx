import React, { useState, useEffect } from 'react';
// MiniKit imports for Base Mini App
// import { useMiniKit, useAuthenticate, usePrimaryButton, useComposeCast } from '@coinbase/onchainkit/minikit';

const ProoferSlots = () => {
  // MiniKit integration (commented for now - would be uncommented in real implementation)
  // const { context, setFrameReady } = useMiniKit();
  // const { authenticate, isAuthenticated } = useAuthenticate();
  // const { composeCast } = useComposeCast();

  // Game symbols with educational themes
  const symbols = [
    { id: 'grad-blue', emoji: '🎓', color: 'text-blue-400', name: 'Blue Cap' },
    { id: 'grad-red', emoji: '🎓', color: 'text-red-400', name: 'Red Cap' },
    { id: 'grad-gold', emoji: '🎓', color: 'text-yellow-400', name: 'Gold Cap' },
    { id: 'eth', emoji: '💎', color: 'text-purple-400', name: 'ETH' },
    { id: 'btc', emoji: '🪙', color: 'text-orange-400', name: 'BTC' },
    { id: 'berry', emoji: '🍓', color: 'text-red-500', name: 'Berry' },
    { id: 'scroll', emoji: '📜', color: 'text-amber-400', name: 'Scroll' }
  ];

  // Game state
  const [reels, setReels] = useState([
    [symbols[0], symbols[1], symbols[2]],
    [symbols[1], symbols[2], symbols[3]],
    [symbols[2], symbols[3], symbols[4]]
  ]);
  
  const [spinning, setSpinning] = useState(false);
  const [score, setScore] = useState(100);
  const [level, setLevel] = useState(1);
  const [education, setEducation] = useState({
    wallets: false,
    tokens: false,
    defi: false,
    nfts: false
  });
  const [showEducation, setShowEducation] = useState(false);
  const [walletUnlocked, setWalletUnlocked] = useState(false);
  const [frameReady, setFrameReadyState] = useState(false);

  // Proofer's messages for different situations
  const prooferMessages = {
    welcome: "Hey there, future Web3 explorer! I'm Proofer, your alien guide! 🛸",
    frameReady: "Frame initialized! Ready to explore Base with Proofer! 🚀",
    spinning: "Analyzing the blockchain... beep boop! 🤖",
    gradWin: "Excellent! You've graduated to wallet knowledge! 🎓",
    cryptoWin: "Cosmic! Those crypto symbols aligned perfectly! 💫",
    levelUp: "You're leveling up faster than light speed! ⚡",
    walletReady: "Amazing! You're ready for your Web3 passport! 📱",
    authenticated: "Welcome aboard the mothership! You're verified! ✨",
    lowScore: "Don't worry, even aliens need practice! Keep spinning! 🚀",
    maxEducation: "WOW! You've mastered Web3! Ready to explore the galaxy? 🌌"
  };

  const [message, setMessage] = useState(prooferMessages.welcome);

  // Educational content
  const lessons = {
    wallets: {
      title: "🔐 Crypto Wallets",
      content: "Wallets store your crypto keys - like a digital keychain! Base App makes it super easy to get started.",
      requirement: "Get 3 graduation caps in a row"
    },
    tokens: {
      title: "🪙 Base Tokens", 
      content: "Base is Ethereum Layer 2 - faster and cheaper! ETH, USDC, and other tokens live here.",
      requirement: "Match 3 crypto symbols"
    },
    defi: {
      title: "🌐 DeFi on Base",
      content: "Uniswap, Aave, and more DeFi protocols run on Base with lower fees than mainnet Ethereum!",
      requirement: "Reach level 3"
    },
    nfts: {
      title: "🖼️ Base NFTs",
      content: "Mint and trade NFTs on Base! Lower gas fees mean more creativity and experimentation.",
      requirement: "Complete all other lessons"
    }
  };

  // Initialize MiniKit frame
  useEffect(() => {
    // In real implementation, this would signal frame readiness to Base App
    // setFrameReady();
    setTimeout(() => {
      setFrameReadyState(true);
      setMessage(prooferMessages.frameReady);
    }, 1000);
  }, []);

  // Spin the slots
  const spin = () => {
    console.log('Spin function called', { spinning, score });
    if (spinning || score <= 0) {
      console.log('Spin prevented', { spinning, score });
      return;
    }
    
    setSpinning(true);
    setScore(prev => {
      const newScore = prev - 10;
      console.log('Score updated', { oldScore: prev, newScore });
      return newScore;
    });
    setMessage(prooferMessages.spinning);

    // Animate spinning effect
    setTimeout(() => {
      const newReels = reels.map(() =>
        Array(3).fill(null).map(() => symbols[Math.floor(Math.random() * symbols.length)])
      );
      
      console.log('New reels generated', newReels);
      setReels(newReels);
      checkWin(newReels);
      setSpinning(false);
    }, 2000);
  };

  // Check for wins and educational progress
  const checkWin = (currentReels) => {
    console.log('Checking for wins', currentReels);
    const topRow = currentReels.map(reel => reel[0]);
    const middleRow = currentReels.map(reel => reel[1]);
    const bottomRow = currentReels.map(reel => reel[2]);

    console.log('Rows:', { topRow, middleRow, bottomRow });

    let winAmount = 0;
    let educationalWin = '';

    // Check winning lines
    [topRow, middleRow, bottomRow].forEach((row, index) => {
      console.log(`Checking row ${index}:`, row);
      if (row[0].id === row[1].id && row[1].id === row[2].id) {
        console.log('Three of a kind detected:', row[0].id);
        // Three of a kind
        if (row[0].id.includes('grad')) {
          winAmount += 50;
          educationalWin = 'wallets';
          setMessage(prooferMessages.gradWin);
        } else if (['eth', 'btc'].includes(row[0].id)) {
          winAmount += 30;
          educationalWin = 'tokens';
          setMessage(prooferMessages.cryptoWin);
        } else {
          winAmount += 20;
          setMessage("Sweet! Proofer loves berries from his home planet! 🍓");
        }
      } else if (row.every(symbol => ['eth', 'btc'].includes(symbol.id))) {
        console.log('Mixed crypto symbols detected');
        // Mixed crypto symbols
        winAmount += 25;
        educationalWin = 'tokens';
        setMessage("Stellar! Mixed crypto knowledge acquired! 🌟");
      }
    });

    console.log('Win calculation:', { winAmount, educationalWin });

    if (winAmount > 0) {
      setScore(prev => {
        const newScore = prev + winAmount;
        console.log('Score updated after win:', { oldScore: prev, newScore, winAmount });
        return newScore;
      });

      if (educationalWin) {
        setEducation(prev => {
          const newEducation = { ...prev, [educationalWin]: true };
          console.log('Education updated:', { oldEducation: prev, newEducation, educationalWin });
          return newEducation;
        });
      }
    } else {
      console.log('No win detected');
      if (score < 50) {
        setMessage(prooferMessages.lowScore);
      } else {
        setMessage("Keep exploring! Every spin teaches you more about Base! 🛸");
      }
    }

    // Level progression with Proofer messages
    console.log('Checking level progression:', { score, level });
    if (score > 200 && level === 1) {
      setLevel(2);
      setMessage(prooferMessages.levelUp);
    } else if (score > 400 && level === 2) {
      setLevel(3);
      setEducation(prev => ({ ...prev, defi: true }));
      setMessage("Intergalactic! You've unlocked DeFi knowledge on Base! 🌌");
    }
  };

  // MiniKit wallet connection simulation
  const handleWalletConnect = async () => {
    console.log('Wallet connect initiated', { walletUnlocked });

    if (!walletUnlocked) {
      console.log('Wallet not unlocked yet');
      return;
    }

    // In real implementation:
    // await authenticate();
    // setMessage(prooferMessages.authenticated);

    // For demo:
    console.log('Starting wallet connection demo');
    setMessage("🚀 Connecting to Base App... (Demo Mode)");
    setTimeout(() => {
      console.log('Wallet connection demo completed');
      setMessage(prooferMessages.authenticated);
    }, 2000);
  };

  // Share achievement on Farcaster
  const shareAchievement = () => {
    // In real implementation:
    // composeCast({
    //   text: `Just graduated from @proofer's Web3 academy! 🎓👽 Ready to explore Base! 🚀`,
    //   embeds: [window.location.href]
    // });
    
    setMessage("🎯 Achievement shared to Farcaster! (Demo Mode)");
  };

  // Check if ready for wallet with Proofer reactions
  const completedLessons = Object.values(education).filter(Boolean).length;

  useEffect(() => {
    console.log('Educational progress useEffect triggered', { education, level, walletUnlocked, completedLessons });

    if (education.wallets && education.tokens && level >= 2) {
      console.log('Wallet unlock conditions met');
      setWalletUnlocked(true);
      if (!walletUnlocked) {
        setMessage(prooferMessages.walletReady);
      }
    } else {
      console.log('Wallet unlock conditions not met', { wallets: education.wallets, tokens: education.tokens, level });
    }

    if (education.wallets && education.tokens && education.defi) {
      console.log('NFT unlock conditions met');
      setEducation(prev => ({ ...prev, nfts: true }));
      if (completedLessons === 3) {
        setMessage(prooferMessages.maxEducation);
      }
    } else {
      console.log('NFT unlock conditions not met', { wallets: education.wallets, tokens: education.tokens, defi: education.defi });
    }
  }, [education, level, walletUnlocked, completedLessons]);

  const progress = (completedLessons / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Proofer Character */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            {/* Frame Status Indicator */}
            <div className={`absolute -top-4 -right-4 w-3 h-3 rounded-full ${frameReady ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
            
            {/* Proofer Alien Character */}
            <div className={`relative transition-all duration-300 ${spinning ? 'animate-bounce' : 'hover:scale-105'}`}>
              {/* Main Body */}
              <div className="w-24 h-32 mx-auto relative">
                {/* Hoodie Body */}
                <div className="w-20 h-24 bg-blue-600 rounded-2xl mx-auto relative border-4 border-blue-700">
                  {/* PROOFER Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PROOFER</span>
                  </div>
                  {/* Hoodie Pocket */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-blue-700 rounded-sm"></div>
                </div>
                
                {/* Head */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-green-400 rounded-full border-4 border-blue-600">
                  {/* Eyes */}
                  <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full">
                    <div className="w-2 h-2 bg-black rounded-full mt-0.5 ml-0.5"></div>
                  </div>
                  <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full">
                    <div className="w-2 h-2 bg-black rounded-full mt-0.5 ml-0.5"></div>
                  </div>
                  {/* Smile */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-full"></div>
                </div>
                
                {/* Antennae */}
                <div className="absolute -top-8 left-3">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full -mt-1 -ml-1 border-2 border-blue-600"></div>
                </div>
                <div className="absolute -top-8 right-3">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full -mt-1 -ml-1 border-2 border-blue-600"></div>
                </div>
                
                {/* Headphones */}
                <div className="absolute -top-4 left-0 w-4 h-8 bg-blue-500 rounded-lg border-2 border-blue-700"></div>
                <div className="absolute -top-4 right-0 w-4 h-8 bg-blue-500 rounded-lg border-2 border-blue-700"></div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-blue-500 rounded-full border-2 border-blue-700"></div>
                
                {/* Arms */}
                <div className="absolute top-8 -left-6 w-12 h-4 bg-blue-600 rounded-full border-2 border-blue-700 rotate-12">
                  {/* Hand with Base Logo */}
                  <div className="absolute -right-2 -top-1 w-6 h-6 bg-green-400 rounded-full border-2 border-blue-600">
                    {walletUnlocked && (
                      <div className="absolute -right-6 -top-3 w-8 h-10 bg-blue-800 rounded text-xs text-white flex flex-col items-center justify-center border border-blue-600">
                        <div className="w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center text-[8px]">⚡</div>
                        <div className="text-[8px] mt-1">BASE</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute top-8 -right-6 w-12 h-4 bg-blue-600 rounded-full border-2 border-blue-700 -rotate-12">
                  <div className="absolute -left-2 -top-1 w-6 h-6 bg-green-400 rounded-full border-2 border-blue-600"></div>
                </div>
              </div>
            </div>
            
            {/* Speech Bubble */}
            <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${spinning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="bg-white text-gray-800 px-3 py-2 rounded-lg text-sm font-medium relative shadow-lg">
                Calculating Web3 wisdom... 🧠
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            PROOFER SLOTS
          </h1>
          <p className="text-lg opacity-80">Your friendly alien guide to Base! 🔵</p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{score}</div>
            <div className="text-sm opacity-80">Score</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{level}</div>
            <div className="text-sm opacity-80">Level</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{completedLessons}/4</div>
            <div className="text-sm opacity-80">Base Lessons</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>🔵 Base Knowledge</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Slot Machine */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-xl shadow-2xl mb-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {reels.map((reel, reelIndex) => (
                <div key={reelIndex} className="bg-gray-800 rounded-lg p-4">
                  <div className="space-y-2">
                    {reel.map((symbol, symbolIndex) => (
                      <div 
                        key={symbolIndex}
                        className={`text-4xl text-center transition-all duration-500 ${spinning ? 'animate-bounce' : ''} ${symbol.color}`}
                      >
                        {symbol.emoji}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={spin}
                disabled={spinning || score <= 0}
                className={`px-8 py-4 text-xl font-bold rounded-lg transition-all ${
                  spinning || score <= 0 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {spinning ? '🌀 SPINNING...' : '🎰 SPIN (10 points)'}
              </button>
            </div>
          </div>
        </div>

        {/* Game Message with Proofer's Guidance */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6 relative">
          {/* Mini Proofer Head */}
          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
            <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-blue-600 relative">
              <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"></div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 border-b border-black rounded-full"></div>
            </div>
          </div>
          <div className="ml-6">
            <p className="text-lg font-medium text-green-400 mb-1">Proofer says:</p>
            <p className="text-white">{message}</p>
          </div>
        </div>

        {/* MiniKit Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setShowEducation(!showEducation)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-all"
          >
            📚 {showEducation ? 'Hide' : 'Show'} Base Lessons
          </button>
          
          {walletUnlocked && (
            <button
              onClick={handleWalletConnect}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg transition-all flex items-center gap-2 justify-center"
            >
              <span className="text-xl">🔵</span>
              <span>Connect Base Wallet</span>
            </button>
          )}

          {completedLessons >= 2 && (
            <button
              onClick={shareAchievement}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-6 py-3 rounded-lg transition-all flex items-center gap-2 justify-center"
            >
              <span className="text-xl">📡</span>
              <span>Share on Farcaster</span>
            </button>
          )}
        </div>

        {/* Educational Content */}
        {showEducation && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {Object.entries(lessons).map(([key, lesson]) => (
              <div 
                key={key}
                className={`p-4 rounded-lg transition-all ${
                  education[key] 
                    ? 'bg-blue-800/30 border-2 border-blue-400' 
                    : 'bg-gray-800/50 border-2 border-gray-600'
                }`}
              >
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  {lesson.title}
                  {education[key] && <span className="ml-2">✅</span>}
                </h3>
                <p className="text-sm opacity-80 mb-2">{lesson.content}</p>
                <p className="text-xs text-blue-300">
                  Unlock: {lesson.requirement}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Footer with Proofer */}
        <div className="text-center mt-8">
          <div className="text-sm opacity-60 mb-2">
            🎓 Learn Base • 🎰 Play • 🚀 Graduate to Real DeFi
          </div>
          <div className="text-xs opacity-40">
            Powered by MiniKit • Guided by Proofer 👽✨
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProoferSlots;