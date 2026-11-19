import mongoose from 'mongoose';
import { ENV } from '../config/env';
import Admin from '../models/Admin';
import Profile from '../models/Profile';
import Skill from '../models/Skill';
import Experience from '../models/Experience';
import Service from '../models/Service';
import Project from '../models/Project';
import Testimonial from '../models/Testimonial';
import BlogPost from '../models/BlogPost';
import ContactMessage from '../models/ContactMessage';
import SiteSetting from '../models/SiteSetting';
import {
  seedProfileData,
  seedSkillsData,
  seedExperienceData,
  seedServicesData,
  seedProjectsData,
  seedTestimonialsData,
  seedBlogPostsData,
  seedSiteSettingsData,
} from './seedData';

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(ENV.MONGODB_URI);
    console.log('[Seed] Database connected successfully.');

    // Clear existing collections
    console.log('[Seed] Wiping existing database data...');
    await Promise.all([
      Admin.deleteMany({}),
      Profile.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      Service.deleteMany({}),
      Project.deleteMany({}),
      Testimonial.deleteMany({}),
      BlogPost.deleteMany({}),
      ContactMessage.deleteMany({}),
      SiteSetting.deleteMany({}),
    ]);

    // Create Admin
    console.log('[Seed] Creating default Admin account...');
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'AdminPass123!',
    });

    // Populate Collections
    console.log('[Seed] Populating Profile...');
    await Profile.create(seedProfileData);

    console.log('[Seed] Populating Skills...');
    await Skill.insertMany(seedSkillsData);

    console.log('[Seed] Populating Experience...');
    await Experience.insertMany(seedExperienceData);

    console.log('[Seed] Populating Services...');
    await Service.insertMany(seedServicesData);

    console.log('[Seed] Populating Projects...');
    await Project.insertMany(seedProjectsData);

    console.log('[Seed] Populating Testimonials...');
    await Testimonial.insertMany(seedTestimonialsData);

    console.log('[Seed] Populating Blog Posts...');
    await BlogPost.insertMany(seedBlogPostsData);

    console.log('[Seed] Populating Site Settings...');
    await SiteSetting.create(seedSiteSettingsData);

    console.log('---------------------------------------------------------');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('---------------------------------------------------------');
    console.log('Default Admin Credentials:');
    console.log('  Email:    admin@example.com');
    console.log('  Password: AdminPass123!');
    console.log('---------------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
