
-- Site settings (single row keyed by 'main')
CREATE TABLE IF NOT EXISTS public.site_settings (
  id text PRIMARY KEY,
  map_latitude numeric,
  map_longitude numeric,
  map_zoom integer NOT NULL DEFAULT 15,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Site settings admin write" ON public.site_settings FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.site_settings (id, map_latitude, map_longitude, map_zoom)
VALUES ('main', 12.9716, 77.5946, 14)
ON CONFLICT (id) DO NOTHING;

CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Hero carousel images
CREATE TABLE IF NOT EXISTS public.hero_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hero images public read" ON public.hero_images FOR SELECT USING (true);
CREATE POLICY "Hero images admin write" ON public.hero_images FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_hero_images_updated BEFORE UPDATE ON public.hero_images
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
