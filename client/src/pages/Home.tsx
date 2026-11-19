import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Experience } from '../sections/Experience';
import { Services } from '../sections/Services';
import { Projects } from '../sections/Projects';
import { Testimonials } from '../sections/Testimonials';
import { Blog } from '../sections/Blog';
import { Contact } from '../sections/Contact';
import {
  fetchProfile,
  fetchSkills,
  fetchExperiences,
  fetchServices,
  fetchProjects,
  fetchTestimonials,
  fetchBlogPosts,
  fetchSettings,
} from '../services/api';
import {
  IProfile,
  ISkill,
  IExperience,
  IService,
  IProject,
  ITestimonial,
  IBlogPost,
  ISiteSetting,
} from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const Home: React.FC = () => {
  const [profile, setProfile] = useState<IProfile | undefined>();
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);
  const [settings, setSettings] = useState<ISiteSetting | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [profData, skData, expData, srvData, projData, testData, blogData, setData] =
          await Promise.all([
            fetchProfile().catch(() => undefined),
            fetchSkills().catch(() => []),
            fetchExperiences().catch(() => []),
            fetchServices().catch(() => []),
            fetchProjects().catch(() => []),
            fetchTestimonials().catch(() => []),
            fetchBlogPosts().catch(() => []),
            fetchSettings().catch(() => undefined),
          ]);

        setProfile(profData);
        setSkills(skData);
        setExperiences(expData);
        setServices(srvData);
        setProjects(projData);
        setTestimonials(testData);
        setBlogPosts(blogData);
        setSettings(setData);
      } catch (err) {
        console.error('Error loading portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar resumeUrl={profile?.resumeUrl} />
      <main className="flex-1">
        <Hero profile={profile} settings={settings} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Experience experiences={experiences} />
        <Services services={services} />
        <Projects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <Blog posts={blogPosts} />
        <Contact profile={profile} settings={settings} />
      </main>
      <Footer settings={settings} />
    </div>
  );
};
