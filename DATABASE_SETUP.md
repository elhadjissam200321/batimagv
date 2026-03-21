# Database Setup Guide for BATIMAG

## Current Status
Your Supabase project is connected, but the database tables haven't been created yet. This is why you're seeing errors like "Could not find the table 'public.articles' in the schema cache".

## How to Set Up Your Database

### Step 1: Access Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Log in to your account
3. Select your project (the one connected to this application)

### Step 2: Open SQL Editor
1. In the left sidebar, click on **"SQL Editor"**
2. Click the **"New Query"** button

### Step 3: Copy the Migration SQL
1. Open the file `/scripts/001-create-tables.sql` in your code editor
2. Copy **all** the SQL content from that file

### Step 4: Execute the SQL
1. Paste the entire SQL content into the Supabase SQL Editor
2. Click the **"Run"** button (or press `Ctrl+Enter` / `Cmd+Enter`)
3. Wait for the query to complete (usually takes a few seconds)

### Step 5: Verify the Setup
You should see green checkmarks indicating successful table creation:
- ✓ `articles` table created
- ✓ `companies` table created
- ✓ `sectors` table created
- ✓ `jobs` table created
- ✓ `trainings` table created
- ✓ `events` table created
- ✓ `newsletter_subscribers` table created
- ✓ `real_estate_properties` table created
- ✓ All indexes created
- ✓ Row Level Security (RLS) policies applied

### Step 6: Refresh the Application
1. Return to your application in the browser
2. Refresh the page (F5 or Cmd+R)
3. The application should now load without errors

## What Gets Created

The migration script creates the following tables with appropriate indexes and Row Level Security policies:

### Content Tables
- **articles** - News and updates about construction/infrastructure
- **companies** - B2B business directory with certifications and ratings
- **sectors** - Categories for organizing companies and content
- **jobs** - Job listings with contract types and requirements
- **trainings** - Training courses with institutions and certifications
- **events** - Events, conferences, salons, and webinars
- **real_estate_properties** - Property listings for sale or rent

### Utility Tables
- **newsletter_subscribers** - Email subscription management

## Troubleshooting

### Still seeing "table not found" errors after setup?
1. Verify the SQL executed successfully (check for error messages in Supabase)
2. Refresh your browser page
3. Clear your browser cache
4. Check that your Supabase API key is correctly set in environment variables

### SQL execution failed?
1. Make sure you're using the full SQL from `001-create-tables.sql`
2. Check for any syntax errors in the Supabase SQL Editor
3. Verify your Supabase project has PostgreSQL extensions enabled

### Can't connect to Supabase?
1. Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Verify your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
3. Check project settings in v0 (click settings in the top right, then "Vars" tab)

## Getting Help
If you continue to experience issues:
1. Visit https://supabase.com/docs for documentation
2. Check the Supabase Discord community
3. Open a support ticket at https://vercel.com/help
