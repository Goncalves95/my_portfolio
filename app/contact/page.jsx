"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const info = [
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "fernandojcg22@gmail.com",
    url: "mailto:fernandojcg22@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "Zurich, Switzerland",
    url: "https://maps.google.com/?q=Zurich,Switzerland",
  },
];

const socialLinks = [
  {
    icon: <FaGithub />,
    title: "GitHub",
    url: "https://github.com/Goncalves95",
  },
  {
    icon: <FaLinkedin />,
    title: "LinkedIn",
    url: "https://linkedin.com/in/fernando-gonçalves-95b5b8174",
  },
  {
    icon: <FaYoutube />,
    title: "YouTube",
    url: "https://youtube.com/@fernandogoncalves",
  },
];

import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Mensagem enviada com sucesso!' });
        // Reset form
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitStatus({ success: false, message: result.error || 'Erro ao enviar mensagem' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Erro de conexão. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">Let's work together</h3>
              <p className="text-white/60">
              Collaborate with me to bring your vision to life and achieve success.
              </p>
              
              {/* Status message */}
              {submitStatus && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.success 
                    ? 'bg-green-500/20 border border-green-500 text-green-400' 
                    : 'bg-red-500/20 border border-red-500 text-red-400'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  type="text" 
                  name="firstname"
                  placeholder="Firstname" 
                  value={formData.firstname}
                  onChange={handleInputChange}
                  required
                />
                <Input 
                  type="text" 
                  name="lastname"
                  placeholder="Lastname" 
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                />
                <Input 
                  type="email" 
                  name="email"
                  placeholder="Email address" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone number" 
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              {/* select */}
              <Select value={formData.service} onValueChange={handleServiceChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="est">Web Development</SelectItem>
                    <SelectItem value="cst">UI/UX Design</SelectItem>
                    <SelectItem value="mst">Data Structure</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* textarea */}
              <Textarea
                name="message"
                className="h-[200px]"
                placeholder="Type your message here."
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              {/* btn */}
              <Button 
                type="submit"
                size="md" 
                className="max-w-40"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          </div>
          {/* info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <div className="flex flex-col gap-10">
              <ul className="flex flex-col gap-10">
                {info.map((item, index) => {
                  return (
                    <li key={index} className="flex items-center gap-6">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 group cursor-pointer"
                      >
                        <div className="text-[28px] group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                      </a>
                      <div className="flex-1">
                        <p className="text-white/60">{item.title}</p>
                        <h3 className="text-xl">{item.description}</h3>
                      </div>
                    </li>
                  );
                })}
              </ul>
              
              {/* Social Links */}
              <div className="mt-8">
                <p className="text-white/60 mb-4">Follow me</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 group"
                    >
                      <div className="text-[28px] group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
