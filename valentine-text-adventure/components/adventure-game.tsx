"use client"

import { useState, useCallback, useEffect } from "react"
import { TypewriterText } from "./typewriter-text"
import { ChoiceButton } from "./choice-button"
import { HeartAnimation } from "./heart-animation"
import { Heart } from "lucide-react"
import Image from "next/image"

interface Choice {
  text: string
  nextScene: string
}

interface Scene {
  id: string
  text: string
  choices?: Choice[]
  isEnding?: boolean
  showHearts?: boolean
  showBalakay?: boolean
  transformToCupid?: boolean
}

function getScenes(): Record<string, Scene> {
  return {
    start: {
      id: "start",
      text: "It is January. \n\nYou are sitting at your desk once again on a call with Landon. \n\nHe sent you a link?",
      choices: [{ text: "Open it", nextScene: "look" }],
    },
    look: {
      id: "look",
      text: "It is a text adventure to ask you to be his Valentine!!! \n\n... \n\nThat is kinda cringy...",
      choices: [{ text: "Maybe a little", nextScene: "question1" }],
    },
    question1: {
      id: "question1",
      text: "Well... \n\nWhat do you say? \n\nWill you be his Valentine?",
      choices: [
        { text: "Of course!", nextScene: "stopped" },
        { text: "I suppose so", nextScene: "stopped" },
      ],
    },
    stopped: {
      id: "stopped",
      text: "Well. \n\nThat was shorter than I thought it would be.",
      choices: [{ text: "What more could there be?", nextScene: "intruder" }],
    },
    intruder: {
      id: "intruder",
      text: "I guess you are right. \n\nWait... \n\nWho is that?",
      choices: [{ text: "Who?", nextScene: "intruder2" }],
    },
    intruder2: {
      id: "intruder2",
      text: "'What's up'",
      choices: [{ text: "Balakay?", nextScene: "talk1" }],
      showBalakay: true,
    },
    talk1: {
      id: "talk1",
      text: "'Yeah there is something I needed to tell you' \n\nNow hold on this is not what was planned. \n\nThis is just a short and simple Valentine's propo- \n\n'That would have kind of sucked though right?' \n\nWhat? \n\n'I mean, just some text that asked that question? Kind of sucky, and cringy.' \n\nI can agree on the second part but- \n\n",
      choices: [{ text: "What is going on?", nextScene: "talk2" }],
      showBalakay: true,
    },
    talk2: {
      id: "talk2",
      text: "'That other guy should be quiet for a while.' \n\n'Now' \n\n'I thought you should know the truth after all this time' \n\n'I'm not just a cat",
      choices: [{ text: "What do you mean?", nextScene: "talk3" }],
      showBalakay: true,
    },
    talk3: {
      id: "talk3",
      text: "I am \n\nA cupid.",
      choices: [{ text: "WHAT?", nextScene: "" }],
      showBalakay: true,
      transformToCupid: true,
    },
    question: {
      id: "question",
      text: "The flowers spell out:\n\nWill you be my Valentine?\n\nYour heart beats faster...\n\nThis is the moment.",
      choices: [
        { text: "Yes!", nextScene: "yes" },
        { text: "YES!!", nextScene: "yes" },
      ],
      showHearts: true,
    },
    yes: {
      id: "yes",
      text: "CONGRATULATIONS!\n\nYou have completed the quest!\n\nYou are now officially my Valentine!\n\nI love you\n\nThank you for going on this adventure with me.\n\nNow let us create our own real adventure together!",
      isEnding: true,
      showHearts: true,
    },
  }
}

const scenes = getScenes()

export function AdventureGame() {
  const [currentScene, setCurrentScene] = useState<Scene>(scenes.start)
  const [showChoices, setShowChoices] = useState(false)
  const [isTyping, setIsTyping] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [showBalakay, setShowBalakay] = useState(false)
  const [isCupidBalakay, setIsCupidBalakay] = useState(false)

  const handleTextComplete = useCallback(() => {
    setIsTyping(false)
    if (currentScene.transformToCupid) {
      setTimeout(() => {
        setIsCupidBalakay(true)
        setTimeout(() => setShowChoices(true), 800)
      }, 500)
    } else {
      setTimeout(() => setShowChoices(true), 500)
    }
  }, [currentScene.transformToCupid])

  const handleChoice = useCallback((nextSceneId: string) => {
    setShowChoices(false)
    setIsTyping(true)
    setShowBalakay(false)
    setTimeout(() => {
      const nextScene = scenes[nextSceneId]
      setCurrentScene(nextScene)
      if (nextScene.showBalakay) {
        setTimeout(() => setShowBalakay(true), 300)
      }
    }, 300)
  }, [])

  const startGame = useCallback(() => {
    setGameStarted(true)
  }, [])

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-lg">
          <div className="animate-float">
            <Heart className="w-20 h-20 mx-auto text-primary text-glow" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-6xl text-primary text-glow tracking-wider">A SPECIAL QUEST</h1>
          <p className="text-xl md:text-2xl text-foreground/80">An adventure awaits you...</p>
          <button
            onClick={startGame}
            className="px-8 py-4 text-2xl bg-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform border-2 border-primary/50 hover:border-primary"
          >
            [ START ADVENTURE ]
          </button>
          <p className="text-sm text-muted-foreground">Press START to begin your journey</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {currentScene.showHearts && <HeartAnimation />}

      <div className="w-full max-w-2xl relative">
        <div className="bg-card border-2 border-border rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-secondary px-4 py-2 flex items-center gap-2 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <div className="w-3 h-3 rounded-full bg-muted-foreground/60" />
            <span className="ml-4 text-sm text-muted-foreground">adventure.exe</span>
          </div>

          <div className="p-6 md:p-8 min-h-[400px] flex flex-col">
            <div className="flex-1">
              <TypewriterText key={currentScene.id} text={currentScene.text} onComplete={handleTextComplete} />
            </div>

            {showChoices && currentScene.choices && (
              <div className="mt-8 space-y-3">
                {currentScene.choices.map((choice, index) => (
                  <ChoiceButton
                    key={index}
                    text={choice.text}
                    index={index}
                    onClick={() => handleChoice(choice.nextScene)}
                  />
                ))}
              </div>
            )}

            {currentScene.isEnding && showChoices && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setCurrentScene(scenes.start)
                    setShowChoices(false)
                    setIsTyping(true)
                  }}
                  className="px-6 py-3 text-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  [ Play Again ]
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className={`absolute -right-4 md:-right-32 top-1/2 -translate-y-1/2 transition-all duration-700 ${
            showBalakay ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <div className="bg-card border-2 border-primary rounded-lg p-2 shadow-xl relative overflow-hidden">
            <div className="relative w-[120px] h-[120px]">
              <Image 
                src="/images/balakay.png" 
                alt="Balakay the cat" 
                width={120} 
                height={120} 
                className={`rounded-md absolute inset-0 transition-opacity duration-700 ${isCupidBalakay ? "opacity-0" : "opacity-100"}`} 
              />
              <Image 
                src="/images/cupid-20balakay.png" 
                alt="Cupid Balakay" 
                width={120} 
                height={120} 
                className={`rounded-md absolute inset-0 transition-opacity duration-700 ${isCupidBalakay ? "opacity-100" : "opacity-0"}`} 
              />
            </div>
            <p className={`text-xs text-center text-primary mt-1 font-bold transition-all duration-500 ${isCupidBalakay ? "scale-105" : ""}`}>
              {isCupidBalakay ? "Cupid Balakay" : "Balakay"}
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">Made with love for someone special</p>
      </div>
    </div>
  )
}
