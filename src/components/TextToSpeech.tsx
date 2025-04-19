
import React, { useState } from 'react';
import { Mic, Volume2, VolumeX, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const { toast } = useToast();

  const speechSynthesis = window.speechSynthesis;
  const utterance = React.useRef<SpeechSynthesisUtterance | null>(null);

  React.useEffect(() => {
    // Get available voices
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        
        // Try to find a female voice
        const femaleVoice = availableVoices.find(v => 
          v.name.includes('female') || 
          v.name.includes('girl') || 
          v.name.includes('woman') ||
          v.name.toLowerCase().includes('samantha')
        );
        setVoice(femaleVoice || availableVoices[0]);
      }
    };

    loadVoices();

    // Some browsers need this event to get voices
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Clean up on unmount
    return () => {
      if (isSpeaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle speak button click
  const handleSpeak = () => {
    if (!text.trim()) {
      toast({
        title: "Please Enter Text",
        description: "Write a love message to hear it spoken aloud.",
        variant: "destructive"
      });
      return;
    }

    // Cancel any previous speaking
    speechSynthesis.cancel();
    
    // Create a new utterance
    utterance.current = new SpeechSynthesisUtterance(text);
    
    // Set properties
    if (voice) utterance.current.voice = voice;
    utterance.current.rate = rate;
    utterance.current.pitch = pitch;
    utterance.current.volume = volume;

    // Set event handlers
    utterance.current.onstart = () => setIsSpeaking(true);
    utterance.current.onend = () => setIsSpeaking(false);
    utterance.current.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      toast({
        title: "Speech Error",
        description: "There was an error playing the speech.",
        variant: "destructive"
      });
    };

    // Start speaking
    speechSynthesis.speak(utterance.current);
  };

  // Handle stop button click
  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Sample love messages
  const loveMessages = [
    "You are the sunshine that brightens my day and the moonlight that guides me through the night.",
    "Every moment with you feels like a beautiful dream I never want to wake up from.",
    "Your love is the greatest gift I have ever received. I cherish it with all my heart.",
    "When I look into your eyes, I see the reflection of all my happiest moments.",
    "You are my today and all of my tomorrows. I love you more than words can express."
  ];

  const useSampleMessage = (index: number) => {
    setText(loveMessages[index]);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-quantum-deeprose">
          <Mic className="h-5 w-5" />
          <span className="font-pacifico">Spoken Love Letter</span>
        </CardTitle>
        <CardDescription>
          Write a love message and have it read aloud with a soft voice
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <Textarea
            placeholder="Type your love message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px] font-poppins"
          />
        </div>

        <div className="grid gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Voice</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={voice?.name || ''}
              onChange={(e) => {
                const selectedVoice = voices.find(v => v.name === e.target.value);
                if (selectedVoice) setVoice(selectedVoice);
              }}
            >
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Speed</label>
              <span className="text-xs">{rate.toFixed(1)}x</span>
            </div>
            <Slider 
              value={[rate]} 
              min={0.5} 
              max={1.5} 
              step={0.1} 
              onValueChange={([newRate]) => setRate(newRate)} 
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Pitch</label>
              <span className="text-xs">{pitch.toFixed(1)}</span>
            </div>
            <Slider 
              value={[pitch]} 
              min={0.5} 
              max={1.5} 
              step={0.1} 
              onValueChange={([newPitch]) => setPitch(newPitch)} 
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium flex items-center">
                Volume
                {volume === 0 ? <VolumeX className="ml-1 h-3 w-3" /> : <Volume2 className="ml-1 h-3 w-3" />}
              </label>
              <span className="text-xs">{Math.round(volume * 100)}%</span>
            </div>
            <Slider 
              value={[volume]} 
              min={0} 
              max={1} 
              step={0.1} 
              onValueChange={([newVolume]) => setVolume(newVolume)} 
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {isSpeaking ? (
            <Button onClick={handleStop} variant="destructive" className="w-full flex gap-2">
              <Square size={16} />
              Stop Speaking
            </Button>
          ) : (
            <Button onClick={handleSpeak} variant="default" className="w-full flex gap-2">
              <Play size={16} />
              Speak My Message
            </Button>
          )}
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Sample Messages</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {loveMessages.map((msg, index) => (
              <Button 
                key={index} 
                variant="outline"
                className="text-left h-auto py-2 text-xs truncate"
                onClick={() => useSampleMessage(index)}
              >
                {msg.length > 40 ? msg.substring(0, 40) + "..." : msg}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToSpeech;
