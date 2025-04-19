
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface AddNoteFormData {
  content: string;
}

interface AddNoteDialogProps {
  onAddNote: (note: { content: string; date: string; color: string }) => void;
}

const colors = ["bg-quantum-pink", "bg-quantum-cream", "bg-quantum-rosegold", "bg-quantum-softpink"];

const AddNoteDialog: React.FC<AddNoteDialogProps> = ({ onAddNote }) => {
  const form = useForm<AddNoteFormData>();
  const { toast } = useToast();

  const onSubmit = (data: AddNoteFormData) => {
    const newNote = {
      content: data.content,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    
    onAddNote(newNote);
    form.reset();
    toast({
      title: "Note Added",
      description: "Your love note has been added to the wall.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-quantum-rosegold hover:bg-quantum-deeprose text-white rounded-full px-6 py-3 transition-colors duration-300 shadow-md">
          Schedule a New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Love Note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your love note here..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Add Note</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;
