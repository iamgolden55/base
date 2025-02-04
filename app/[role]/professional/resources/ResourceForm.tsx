"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface ResourceFormData {
  title: string;
  description: string;
  category: string;
  specialty: string;
  type: string;
  url?: string;
}

export function ResourceForm() {
  const [formData, setFormData] = useState<ResourceFormData>({
    title: '',
    description: '',
    category: '',
    specialty: '',
    type: '',
    url: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/professional/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit resource');

      toast({
        title: "Success",
        description: "Resource submitted successfully",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        specialty: '',
        type: '',
        url: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit resource",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <Textarea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        options={[
          { value: 'clinical', label: 'Clinical' },
          { value: 'research', label: 'Research' },
          { value: 'education', label: 'Education' },
        ]}
      />

      <Select
        label="Specialty"
        name="specialty"
        value={formData.specialty}
        onChange={handleChange}
        required
        options={[
          { value: 'cardiology', label: 'Cardiology' },
          { value: 'neurology', label: 'Neurology' },
          { value: 'pediatrics', label: 'Pediatrics' },
        ]}
      />

      <Input
        label="Resource URL"
        name="url"
        type="url"
        value={formData.url}
        onChange={handleChange}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Resource"}
      </Button>
    </form>
  );
}