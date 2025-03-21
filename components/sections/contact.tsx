"use client"

import React, { useState } from "react"
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
import { Button } from "../ui/button"
import { Reveal } from "../animation-lib"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { MotionDiv } from "../animation-lib"

// Define form schema with zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Namnet måste vara minst 2 tecken." }),
  email: z.string().email({ message: "Ogiltig e-postadress." }),
  phone: z.string().min(6, { message: "Ange ett giltigt telefonnummer." }),
  message: z.string().min(10, { message: "Meddelandet måste vara minst 10 tecken." }),
});

type FormValues = z.infer<typeof formSchema>;

export const Contact: React.FC = () => {
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
  
  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    setFormStatus('submitting');
    
    try {
      // Here we would send the data to an API endpoint
      // For now we're just simulating a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success!
      setFormStatus('success');
      form.reset();
      
      // Reset status after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
      
    } catch (error) {
      // Handle error
      setFormStatus('error');
      setErrorMessage("Det uppstod ett fel. Vänligen försök igen senare.");
      
      // Reset error status after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };
  
  return (
    <section id="contact" className="bg-amber-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto flex flex-col items-center">
        <Reveal>
          <h2 className="mb-4 text-center text-2xl sm:text-3xl font-bold text-neutral-900 md:text-4xl">
            Kontakta Oss
          </h2>
          <p className="mx-auto mb-8 sm:mb-12 lg:mb-16 max-w-3xl text-center text-base sm:text-lg text-neutral-700">
            Har du frågor om våra tjänster eller vill boka en tid? Kontakta oss genom att fylla i formuläret nedan eller besök vår klinik.
          </p>
        </Reveal>
        
        <div className="grid gap-6 md:gap-12 md:grid-cols-2 w-full max-w-7xl">
          {/* Contact Form */}
          <div className="rounded-xl bg-white p-4 sm:p-6 lg:p-8 shadow-lg order-2 md:order-1">
            <h3 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-neutral-900">Skicka ett meddelande</h3>
            
            {formStatus === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="mb-3 text-xl font-semibold text-neutral-900">Tack för ditt meddelande!</h4>
                <p className="mb-6 text-neutral-700">
                  Vi har tagit emot ditt meddelande och återkommer så snart som möjligt.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormStatus('idle');
                    form.reset();
                  }}
                  className="border-amber-200 text-amber-600 hover:bg-amber-50"
                >
                  Skicka nytt meddelande
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Namn</FormLabel>
                        <FormControl>
                          <Input placeholder="Ditt namn" {...field} className="h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-post</FormLabel>
                          <FormControl>
                            <Input placeholder="Din e-postadress" {...field} className="h-11" />
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
                          <FormLabel>Telefon (valfritt)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ditt telefonnummer" {...field} className="h-11" />
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
                            placeholder="Beskriv vad du behöver hjälp med" 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Error message */}
                  {formStatus === 'error' && (
                    <div className="flex items-center rounded-md bg-red-50 p-3 text-red-700">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  
                  {/* Submit button */}
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? 'Skickar...' : 'Skicka meddelande'}
                  </Button>
                </form>
              </Form>
            )}
          </div>
          
          {/* Contact Information */}
          <div className="order-1 md:order-2">
            <div className="mb-6 sm:mb-8 rounded-xl bg-white p-5 sm:p-6 lg:p-8 shadow-lg">
              <h3 className="mb-5 sm:mb-6 text-xl sm:text-2xl font-bold text-neutral-900">Hitta oss</h3>
              
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 mt-1 h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-amber-500" />
                  <div>
                    <h4 className="font-medium text-neutral-900">Adress</h4>
                    <p className="text-neutral-700">Baltzarsgatan 31<br />211 36 Malmö</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-4 mt-1 h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-amber-500" />
                  <div>
                    <h4 className="font-medium text-neutral-900">Telefon</h4>
                    <p className="text-neutral-700">
                      <a href="tel:+4640123456" className="hover:text-amber-600">
                        040-123 45 67
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="mr-4 mt-1 h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-amber-500" />
                  <div>
                    <h4 className="font-medium text-neutral-900">E-post</h4>
                    <p className="text-neutral-700">
                      <a href="mailto:info@baltzartandvard.se" className="hover:text-amber-600">
                        info@baltzartandvard.se
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="mr-4 mt-1 h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-amber-500" />
                  <div>
                    <h4 className="font-medium text-neutral-900">Öppettider</h4>
                    <p className="text-neutral-700">
                      Måndag - Fredag: 08:00 - 17:00<br />
                      Lördag - Söndag: Stängt
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl bg-white p-5 sm:p-6 lg:p-8 shadow-lg">
              <div className="flex items-center">
                <Calendar className="mr-3 sm:mr-4 h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Boka tid</h3>
              </div>
              <p className="mb-5 sm:mb-6 mt-3 sm:mt-4 text-neutral-700">
                För att boka tid för en konsultation eller behandling, vänligen kontakta oss via telefon eller fyll i formuläret.
              </p>
              <Button 
                className="w-full h-11 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                Boka online
              </Button>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-12">
          <div className="h-[400px] w-full overflow-hidden rounded-xl bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2254.1658421728143!2d13.000552776990865!3d55.60414497298593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a3fc4b6649b9%3A0x7b0a39f55deaa4e3!2sBaltzarsgatan%2C%20211%2036%20Malm%C3%B6!5e0!3m2!1ssv!2sse!4v1694532325705!5m2!1ssv!2sse"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Baltzar Tandvård plats"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}; 