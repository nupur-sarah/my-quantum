
import React, { useState } from 'react';
import { PenTool, RefreshCw, Copy, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const PoemGenerator: React.FC = () => {
  const [keywords, setKeywords] = useState('');
  const [poem, setPoem] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Sample poems based on common keywords
  const samplePoems = [
    {
      keywords: ['love', 'heart', 'forever'],
      text: `In chambers of my heart, you dwell,
A love story only time can tell.
Forever in your arms I'll stay,
My love for you grows day by day.`
    },
    {
      keywords: ['stars', 'night', 'dreams'],
      text: `Under stars that paint the night,
Your smile glows with endless light.
In dreams you hold me, safe and warm,
A love that weathers every storm.`
    },
    {
      keywords: ['adventure', 'journey', 'together'],
      text: `Hand in hand on life's long road,
Together we carry each other's load.
Adventure awaits with each sunrise new,
Every journey sweeter when shared with you.`
    },
    {
      keywords: ['smile', 'eyes', 'touch'],
      text: `Your smile, a beacon in darkest night,
Your eyes, pools of love and delight.
Your touch, electric on my skin,
You're the harmony to my heart's sweet hymn.`
    }
  ];

  const getRandomPoemForKeywords = (inputKeywords: string) => {
    const keywordArray = inputKeywords.toLowerCase().split(/[\s,]+/).filter(k => k.length > 0);
    
    if (keywordArray.length === 0) {
      // If no keywords, pick a random poem
      return samplePoems[Math.floor(Math.random() * samplePoems.length)].text;
    }
    
    // Find poems that match at least one keyword
    const matchingPoems = samplePoems.filter(poem => 
      poem.keywords.some(k => keywordArray.includes(k))
    );
    
    if (matchingPoems.length > 0) {
      return matchingPoems[Math.floor(Math.random() * matchingPoems.length)].text;
    } else {
      // If no matches, return a random poem
      return samplePoems[Math.floor(Math.random() * samplePoems.length)].text;
    }
  };

  const generatePoem = () => {
    setIsGenerating(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      const newPoem = getRandomPoemForKeywords(keywords);
      setPoem(newPoem);
      setIsGenerating(false);
      
      toast({
        title: "Poem Generated",
        description: "Your love poem is ready to share",
      });
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(poem).then(() => {
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Poem copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Keywords suggestions
  const suggestions = ['love', 'forever', 'stars', 'dreams', 'journey', 'smile', 'heart'];

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-quantum-deeprose font-pacifico gap-2">
          <PenTool className="h-5 w-5" />
          Love Poem Generator
        </CardTitle>
        <CardDescription>
          Create a special love poem based on keywords
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Enter keywords (separated by commas or spaces)
            </label>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="love, stars, forever..."
              className="w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => setKeywords(keywords ? `${keywords}, ${suggestion}` : suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
          
          <Button
            onClick={generatePoem}
            disabled={isGenerating}
            className="w-full bg-quantum-deeprose hover:bg-quantum-rosegold flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Love Poem
              </>
            )}
          </Button>
          
          {poem && (
            <div className="mt-6 relative">
              <div className="bg-secondary/50 p-6 rounded-md italic text-center relative">
                {poem.split('\n').map((line, i) => (
                  <p key={i} className="my-2">{line}</p>
                ))}
              </div>
              
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              
              <div className="mt-4 text-center">
                <Button
                  onClick={generatePoem}
                  variant="outline"
                  size="sm"
                  className="text-quantum-deeprose"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate Another
                </Button>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground text-center mt-4">
            Note: This uses pre-written poems. For AI-generated poems, we would need to integrate with an AI API.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PoemGenerator;
