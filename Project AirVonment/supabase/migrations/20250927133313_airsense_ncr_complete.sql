-- Location: supabase/migrations/20250927133313_airsense_ncr_complete.sql
-- Schema Analysis: Fresh project - no existing schema
-- Integration Type: Complete air quality monitoring system
-- Dependencies: None (fresh implementation)

-- 1. Types and Enums
CREATE TYPE public.user_role AS ENUM ('admin', 'policy_maker', 'citizen', 'analyst');
CREATE TYPE public.aqi_category AS ENUM ('good', 'satisfactory', 'moderate', 'poor', 'very_poor', 'severe');
CREATE TYPE public.station_status AS ENUM ('active', 'maintenance', 'inactive');
CREATE TYPE public.alert_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.report_status AS ENUM ('pending', 'verified', 'resolved', 'rejected');
CREATE TYPE public.intervention_status AS ENUM ('planned', 'active', 'completed', 'cancelled');

-- 2. Core Tables

-- Critical intermediary table for PostgREST compatibility
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'citizen'::public.user_role,
    phone TEXT,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    location_name TEXT,
    notification_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Air Quality Monitoring Stations
CREATE TABLE public.monitoring_stations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    station_code TEXT NOT NULL UNIQUE,
    station_name TEXT NOT NULL,
    location_lat DECIMAL(10, 8) NOT NULL,
    location_lng DECIMAL(11, 8) NOT NULL,
    address TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'Delhi',
    status public.station_status DEFAULT 'active'::public.station_status,
    installation_date DATE,
    last_maintenance TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Real-time Air Quality Data
CREATE TABLE public.air_quality_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    station_id UUID REFERENCES public.monitoring_stations(id) ON DELETE CASCADE,
    aqi INTEGER NOT NULL,
    pm25 DECIMAL(6, 2),
    pm10 DECIMAL(6, 2),
    no2 DECIMAL(6, 2),
    so2 DECIMAL(6, 2),
    co DECIMAL(6, 2),
    o3 DECIMAL(6, 2),
    nh3 DECIMAL(6, 2),
    temperature DECIMAL(5, 2),
    humidity DECIMAL(5, 2),
    wind_speed DECIMAL(5, 2),
    wind_direction INTEGER,
    pressure DECIMAL(7, 2),
    visibility DECIMAL(5, 2),
    aqi_category public.aqi_category,
    recorded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Regional Air Quality Summary
CREATE TABLE public.regional_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region_name TEXT NOT NULL,
    area_description TEXT,
    avg_aqi INTEGER NOT NULL,
    avg_pm25 DECIMAL(6, 2),
    avg_pm10 DECIMAL(6, 2),
    avg_no2 DECIMAL(6, 2),
    station_count INTEGER DEFAULT 0,
    aqi_trend TEXT, -- 'up', 'down', 'stable'
    trend_percentage TEXT,
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    date_recorded DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Citizen Reports and Incidents
CREATE TABLE public.citizen_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    location_name TEXT,
    report_type TEXT, -- 'construction_dust', 'vehicle_emission', 'industrial', 'burning', 'other'
    priority public.alert_priority DEFAULT 'medium'::public.alert_priority,
    status public.report_status DEFAULT 'pending'::public.report_status,
    image_urls TEXT[],
    verified_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Policy Interventions
CREATE TABLE public.policy_interventions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    intervention_type TEXT NOT NULL, -- 'odd_even', 'construction_ban', 'firecracker_ban', 'industrial_restriction'
    target_region TEXT,
    start_date DATE,
    end_date DATE,
    status public.intervention_status DEFAULT 'planned'::public.intervention_status,
    expected_impact_percentage INTEGER,
    actual_impact_percentage INTEGER,
    implemented_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Fire Hotspots (NASA FIRMS data)
CREATE TABLE public.fire_hotspots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    brightness DECIMAL(7, 2),
    scan DECIMAL(5, 2),
    track DECIMAL(5, 2),
    acq_date DATE NOT NULL,
    acq_time TEXT,
    satellite TEXT,
    confidence INTEGER,
    version TEXT,
    bright_t31 DECIMAL(7, 2),
    frp DECIMAL(8, 2),
    daynight TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Activity Feed for Dashboard
CREATE TABLE public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_type TEXT NOT NULL, -- 'alert', 'report', 'simulation', 'update'
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority public.alert_priority DEFAULT 'low'::public.alert_priority,
    location TEXT,
    related_id UUID, -- Can reference different table IDs
    related_table TEXT, -- Table name the related_id refers to
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User Health Profiles
CREATE TABLE public.user_health_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    has_asthma BOOLEAN DEFAULT false,
    has_copd BOOLEAN DEFAULT false,
    has_heart_condition BOOLEAN DEFAULT false,
    is_pregnant BOOLEAN DEFAULT false,
    age_group TEXT, -- 'child', 'adult', 'elderly'
    exercises_outdoors BOOLEAN DEFAULT false,
    sensitive_to_pollution BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- 3. Essential Indexes
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_location ON public.user_profiles(location_lat, location_lng);
CREATE INDEX idx_monitoring_stations_location ON public.monitoring_stations(location_lat, location_lng);
CREATE INDEX idx_monitoring_stations_city ON public.monitoring_stations(city);
CREATE INDEX idx_air_quality_readings_station_time ON public.air_quality_readings(station_id, recorded_at DESC);
CREATE INDEX idx_air_quality_readings_aqi ON public.air_quality_readings(aqi);
CREATE INDEX idx_regional_summaries_date ON public.regional_summaries(date_recorded DESC);
CREATE INDEX idx_citizen_reports_location ON public.citizen_reports(location_lat, location_lng);
CREATE INDEX idx_citizen_reports_status ON public.citizen_reports(status, created_at DESC);
CREATE INDEX idx_policy_interventions_dates ON public.policy_interventions(start_date, end_date);
CREATE INDEX idx_fire_hotspots_location_date ON public.fire_hotspots(latitude, longitude, acq_date DESC);
CREATE INDEX idx_activity_logs_time ON public.activity_logs(created_at DESC);

-- 4. Functions for automatic profile creation and updates
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'citizen'::public.user_role)
    );
    RETURN NEW;
END;
$$;

-- Function to calculate AQI category
CREATE OR REPLACE FUNCTION public.calculate_aqi_category(aqi_value INTEGER)
RETURNS public.aqi_category
LANGUAGE sql
STABLE
AS $$
    SELECT CASE 
        WHEN aqi_value <= 50 THEN 'good'::public.aqi_category
        WHEN aqi_value <= 100 THEN 'satisfactory'::public.aqi_category
        WHEN aqi_value <= 200 THEN 'moderate'::public.aqi_category
        WHEN aqi_value <= 300 THEN 'poor'::public.aqi_category
        WHEN aqi_value <= 400 THEN 'very_poor'::public.aqi_category
        ELSE 'severe'::public.aqi_category
    END;
$$;

-- Function to get latest readings for dashboard
CREATE OR REPLACE FUNCTION public.get_latest_aqi_summary()
RETURNS TABLE(
    avg_aqi DECIMAL,
    active_stations BIGINT,
    total_reports BIGINT,
    active_interventions BIGINT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    WITH latest_readings AS (
        SELECT DISTINCT ON (station_id) station_id, aqi, recorded_at
        FROM public.air_quality_readings 
        ORDER BY station_id, recorded_at DESC
    )
    SELECT 
        ROUND(AVG(lr.aqi), 0) as avg_aqi,
        (SELECT COUNT(*) FROM public.monitoring_stations WHERE status = 'active') as active_stations,
        (SELECT COUNT(*) FROM public.citizen_reports WHERE created_at >= CURRENT_DATE) as total_reports,
        (SELECT COUNT(*) FROM public.policy_interventions WHERE status = 'active') as active_interventions
    FROM latest_readings lr;
$$;

-- 5. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monitoring_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.air_quality_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regional_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citizen_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fire_hotspots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_health_profiles ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies (Using Pattern System)

-- Pattern 1: Core user table - Simple only, no functions
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 4: Public read for monitoring data, admin write
CREATE POLICY "public_can_read_monitoring_stations"
ON public.monitoring_stations
FOR SELECT
TO public
USING (true);

CREATE POLICY "admins_manage_monitoring_stations"
ON public.monitoring_stations
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin' 
             OR au.raw_user_meta_data->>'role' = 'policy_maker')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin' 
             OR au.raw_user_meta_data->>'role' = 'policy_maker')
    )
);

-- Pattern 4: Public read for air quality data
CREATE POLICY "public_can_read_air_quality_readings"
ON public.air_quality_readings
FOR SELECT
TO public
USING (true);

CREATE POLICY "systems_can_insert_air_quality_readings"
ON public.air_quality_readings
FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin' 
             OR au.raw_user_meta_data->>'role' = 'analyst')
    )
);

-- Pattern 4: Public read for regional summaries
CREATE POLICY "public_can_read_regional_summaries"
ON public.regional_summaries
FOR SELECT
TO public
USING (true);

CREATE POLICY "systems_manage_regional_summaries"
ON public.regional_summaries
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin' 
             OR au.raw_user_meta_data->>'role' = 'analyst')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin' 
             OR au.raw_user_meta_data->>'role' = 'analyst')
    )
);

-- Pattern 2: Simple user ownership for citizen reports
CREATE POLICY "users_manage_own_citizen_reports"
ON public.citizen_reports
FOR ALL
TO authenticated
USING (reporter_id = auth.uid())
WITH CHECK (reporter_id = auth.uid());

-- Allow all authenticated users to read all reports (for policy makers)
CREATE POLICY "authenticated_can_read_citizen_reports"
ON public.citizen_reports
FOR SELECT
TO authenticated
USING (true);

-- Pattern 2: Policy interventions managed by policy makers
CREATE POLICY "policy_makers_manage_interventions"
ON public.policy_interventions
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin' 
             OR au.raw_user_meta_data->>'role' = 'policy_maker')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin' 
             OR au.raw_user_meta_data->>'role' = 'policy_maker')
    )
);

-- Allow all authenticated users to read interventions
CREATE POLICY "authenticated_can_read_policy_interventions"
ON public.policy_interventions
FOR SELECT
TO authenticated
USING (true);

-- Pattern 4: Public read for fire hotspots
CREATE POLICY "public_can_read_fire_hotspots"
ON public.fire_hotspots
FOR SELECT
TO public
USING (true);

CREATE POLICY "systems_manage_fire_hotspots"
ON public.fire_hotspots
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin' 
             OR au.raw_user_meta_data->>'role' = 'analyst')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' = 'admin' 
             OR au.raw_user_meta_data->>'role' = 'analyst')
    )
);

-- Pattern 4: Public read for activity logs
CREATE POLICY "public_can_read_activity_logs"
ON public.activity_logs
FOR SELECT
TO public
USING (true);

CREATE POLICY "systems_manage_activity_logs"
ON public.activity_logs
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' IN ('admin', 'policy_maker', 'analyst'))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users au
        WHERE au.id = auth.uid() 
        AND (au.raw_user_meta_data->>'role' IN ('admin', 'policy_maker', 'analyst'))
    )
);

-- Pattern 2: Simple user ownership for health profiles
CREATE POLICY "users_manage_own_health_profiles"
ON public.user_health_profiles
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 7. Triggers
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_citizen_reports_updated_at
    BEFORE UPDATE ON public.citizen_reports
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 8. Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    policy_uuid UUID := gen_random_uuid();
    citizen_uuid UUID := gen_random_uuid();
    station1_uuid UUID := gen_random_uuid();
    station2_uuid UUID := gen_random_uuid();
    station3_uuid UUID := gen_random_uuid();
    station4_uuid UUID := gen_random_uuid();
    station5_uuid UUID := gen_random_uuid();
    station6_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@airsense.gov.in', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "System Administrator", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (policy_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'policy@airsense.gov.in', crypt('policy123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Policy Maker", "role": "policy_maker"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (citizen_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'citizen@example.com', crypt('citizen123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Citizen User", "role": "citizen"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Insert monitoring stations
    INSERT INTO public.monitoring_stations (id, station_code, station_name, location_lat, location_lng, address, city, status) VALUES
        (station1_uuid, 'DL-001', 'Connaught Place', 28.6139, 77.2090, 'Connaught Place, New Delhi', 'New Delhi', 'active'),
        (station2_uuid, 'GG-001', 'Cyber City', 28.4949, 77.0869, 'Cyber City, Gurgaon', 'Gurgaon', 'active'),
        (station3_uuid, 'ND-001', 'Sector 62', 28.6139, 77.3648, 'Sector 62, Noida', 'Noida', 'active'),
        (station4_uuid, 'FB-001', 'Industrial Area', 28.4089, 77.3178, 'Industrial Area, Faridabad', 'Faridabad', 'active'),
        (station5_uuid, 'GZ-001', 'Indirapuram', 28.6411, 77.3712, 'Indirapuram, Ghaziabad', 'Ghaziabad', 'active'),
        (station6_uuid, 'DL-002', 'Laxmi Nagar', 28.6358, 77.2784, 'Laxmi Nagar, East Delhi', 'New Delhi', 'active');

    -- Insert recent air quality readings
    INSERT INTO public.air_quality_readings (station_id, aqi, pm25, pm10, no2, so2, co, o3, temperature, humidity, wind_speed, pressure, aqi_category, recorded_at) VALUES
        (station1_uuid, 145, 89.0, 156.0, 45.0, 12.0, 1.2, 67.0, 28.5, 65.0, 12.0, 1013.0, 'moderate', now() - interval '5 minutes'),
        (station2_uuid, 178, 112.0, 189.0, 52.0, 15.0, 1.8, 73.0, 29.0, 62.0, 8.0, 1012.0, 'poor', now() - interval '3 minutes'),
        (station3_uuid, 134, 78.0, 142.0, 38.0, 10.0, 1.1, 55.0, 27.5, 68.0, 15.0, 1014.0, 'moderate', now() - interval '7 minutes'),
        (station4_uuid, 162, 95.0, 171.0, 48.0, 14.0, 1.5, 62.0, 30.0, 60.0, 10.0, 1011.0, 'poor', now() - interval '10 minutes'),
        (station5_uuid, 149, 87.0, 158.0, 41.0, 11.0, 1.3, 59.0, 28.0, 66.0, 13.0, 1013.0, 'moderate', now() - interval '8 minutes'),
        (station6_uuid, 141, 82.0, 149.0, 43.0, 9.0, 1.0, 61.0, 27.0, 69.0, 14.0, 1015.0, 'moderate', now() - interval '6 minutes');

    -- Insert regional summaries
    INSERT INTO public.regional_summaries (region_name, area_description, avg_aqi, avg_pm25, avg_pm10, avg_no2, station_count, aqi_trend, trend_percentage) VALUES
        ('Central Delhi', 'Connaught Place, India Gate', 145, 89.0, 156.0, 45.0, 8, 'up', '+8%'),
        ('Gurgaon', 'Cyber City, DLF', 178, 112.0, 189.0, 52.0, 6, 'up', '+15%'),
        ('Noida', 'Sector 62, Greater Noida', 134, 78.0, 142.0, 38.0, 5, 'down', '-5%'),
        ('Faridabad', 'Industrial Area, NIT', 162, 95.0, 171.0, 48.0, 4, 'stable', '0%'),
        ('Ghaziabad', 'Indirapuram, Vasundhara', 149, 87.0, 158.0, 41.0, 3, 'down', '-3%'),
        ('East Delhi', 'Laxmi Nagar, Preet Vihar', 141, 82.0, 149.0, 43.0, 7, 'up', '+6%');

    -- Insert citizen reports
    INSERT INTO public.citizen_reports (reporter_id, title, description, location_lat, location_lng, location_name, report_type, priority, created_at) VALUES
        (citizen_uuid, 'Construction Dust', 'Multiple reports of uncontrolled dust from construction site near Connaught Place.', 28.6139, 77.2090, 'Central Delhi', 'construction_dust', 'medium', now() - interval '15 minutes'),
        (citizen_uuid, 'Vehicle Emissions', 'Heavy traffic and visible black smoke from buses on Ring Road.', 28.5355, 77.2910, 'South Delhi', 'vehicle_emission', 'high', now() - interval '45 minutes');

    -- Insert policy interventions
    INSERT INTO public.policy_interventions (title, description, intervention_type, target_region, start_date, end_date, status, expected_impact_percentage, implemented_by) VALUES
        ('Odd-Even Phase 3', 'Implementation of odd-even vehicle scheme for private vehicles.', 'odd_even', 'Delhi NCR', CURRENT_DATE, CURRENT_DATE + interval '15 days', 'planned', 15, admin_uuid),
        ('Construction Activity Ban', 'Temporary ban on construction activities during high pollution days.', 'construction_ban', 'Gurgaon', CURRENT_DATE - interval '2 days', CURRENT_DATE + interval '7 days', 'active', 8, policy_uuid);

    -- Insert fire hotspots (sample data)
    INSERT INTO public.fire_hotspots (latitude, longitude, brightness, acq_date, satellite, confidence) VALUES
        (30.1234, 76.8765, 315.6, CURRENT_DATE - interval '1 day', 'AQUA', 85),
        (30.5678, 76.9012, 298.4, CURRENT_DATE - interval '1 day', 'TERRA', 92),
        (29.9876, 77.1234, 287.2, CURRENT_DATE, 'AQUA', 78);

    -- Insert activity logs
    INSERT INTO public.activity_logs (activity_type, title, description, priority, location, created_at) VALUES
        ('alert', 'AQI Threshold Exceeded', 'Gurgaon region has crossed 200 AQI mark. Immediate intervention recommended.', 'high', 'Gurgaon', now() - interval '5 minutes'),
        ('report', 'Citizen Report: Construction Dust', 'Multiple reports of uncontrolled dust from construction site near Connaught Place.', 'medium', 'Central Delhi', now() - interval '15 minutes'),
        ('simulation', 'Odd-Even Impact Analysis Complete', 'Simulation shows 15% AQI reduction potential with odd-even implementation.', 'low', 'Delhi NCR', now() - interval '30 minutes'),
        ('update', 'New Monitoring Station Online', 'Station DL-47 in Dwarka is now providing real-time air quality data.', 'medium', 'Dwarka', now() - interval '1 hour'),
        ('alert', 'Fire Hotspots Detected', 'NASA FIRMS data shows 12 new fire hotspots in Punjab affecting NCR air quality.', 'high', 'Punjab Border', now() - interval '2 hours');

    -- Insert sample health profile
    INSERT INTO public.user_health_profiles (user_id, has_asthma, age_group, exercises_outdoors) VALUES
        (citizen_uuid, false, 'adult', true);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;
