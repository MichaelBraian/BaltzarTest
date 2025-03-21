import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Check
} from "lucide-react"
import BackgroundImage, { BackgroundSkeleton } from '@/components/ui/background-image';
import { useDefaultBackgroundImage } from '@/lib/hooks/use-background-image';
import { shouldPrioritizeImage, getResponsiveSizes } from '@/lib/image-utils';
import placeholderImage from '@/public/placeholder.svg';
import { Button } from "@/components/ui/button";
import { Reveal, MotionDiv } from "@/components/animation-lib";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactSectionProps {
  /**
   * Optional className for the section
   */
  className?: string;
}

// Define form schema with zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Namnet måste vara minst 2 tecken." }),
  email: z.string().email({ message: "Ogiltig e-postadress." }),
  phone: z.string().min(6, { message: "Ange ett giltigt telefonnummer." }),
  message: z.string().min(10, { message: "Meddelandet måste vara minst 10 tecken." }),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * Contact section component using the default background image
 * 
 * To change the background, simply replace the file at:
 * /public/images/backgrounds/sections/contact/contact-default.webp
 */
export const ContactSection: React.FC<ContactSectionProps> = ({
  className,
}) => {
  // Use the default background image for the contact section
  const { image, isLoading } = useDefaultBackgroundImage('contact');
  
  // Contact sections should prioritize loading based on visibility
  const isPriority = shouldPrioritizeImage('contact');
  
  // Get the responsive sizes for the contact section
  const sizes = getResponsiveSizes('contact');
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setFormStatus('submitting');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      console.log("Form submitted:", data);
      setFormStatus('success');
      form.reset();
      
      // Reset success status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus('error');
      setErrorMessage("Ett problem uppstod. Vänligen försök igen senare.");
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setErrorMessage("");
      }, 5000);
    }
  };
  
  return (
    <section id="contact" className={`relative min-h-screen ${className || ''}`}>
      <BackgroundImage
        src={image || placeholderImage}
        alt="Contact background"
        isLoading={isLoading}
        loadingPlaceholder={<BackgroundSkeleton />}
        priority={isPriority}
        sizes={sizes}
        overlay="rgba(0,0,0,0.6)"
        overlayOpacity={0.7}
      >
        <div className="container mx-auto py-12 sm:py-16 lg:py-20">
          <Reveal>
            <h2 className="mb-4 text-center text-2xl sm:text-3xl font-bold text-white md:text-4xl">
              Kontakta Oss
            </h2>
            <p className="mx-auto mb-8 sm:mb-12 max-w-4xl text-center text-base sm:text-lg text-white text-opacity-90">
              Vi tar emot nya patienter och hjälper gärna till med frågor om våra behandlingar. Kontakta oss via formuläret eller använd våra kontaktuppgifter nedan.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-white border-opacity-20">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">Kontaktuppgifter</h3>
              
              <div className="space-y-6 text-white">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-500 bg-opacity-20 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Besöksadress</h4>
                    <p className="text-white text-opacity-80">
                      Baltzargatan 25<br />
                      211 36 Malmö
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-500 bg-opacity-20 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Telefon</h4>
                    <p className="text-white text-opacity-80">
                      <a href="tel:+4640123456" className="hover:text-amber-200 transition-colors">
                        040-123 456
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-500 bg-opacity-20 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">E-post</h4>
                    <p className="text-white text-opacity-80">
                      <a href="mailto:info@baltzartandvard.se" className="hover:text-amber-200 transition-colors">
                        info@baltzartandvard.se
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-500 bg-opacity-20 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Öppettider</h4>
                    <p className="text-white text-opacity-80">
                      Måndag-Fredag: 08:00-17:00<br />
                      Lördag-Söndag: Stängt
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-6 text-center">Skicka meddelande</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Namn</FormLabel>
                        <FormControl>
                          <Input placeholder="Ditt namn" {...field} disabled={formStatus === 'submitting'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-post</FormLabel>
                          <FormControl>
                            <Input placeholder="Din e-post" type="email" {...field} disabled={formStatus === 'submitting'} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <FormControl>
                            <Input placeholder="Ditt telefonnummer" type="tel" {...field} disabled={formStatus === 'submitting'} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meddelande</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Skriv ditt meddelande här" 
                            className="min-h-[120px]" 
                            {...field}
                            disabled={formStatus === 'submitting'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <Button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full sm:w-auto bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-amber-200 border-t-transparent"></div>
                          Skickar...
                        </>
                      ) : 'Skicka meddelande'}
                    </Button>
                  </div>
                  
                  {/* Form status messages */}
                  {formStatus === 'success' && (
                    <MotionDiv
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 text-green-700 rounded-md p-3 flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>Tack för ditt meddelande! Vi återkommer så snart som möjligt.</span>
                    </MotionDiv>
                  )}
                  
                  {formStatus === 'error' && (
                    <MotionDiv
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 text-red-700 rounded-md p-3 flex items-center"
                    >
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </MotionDiv>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </BackgroundImage>
    </section>
  );
};

export default ContactSection; 