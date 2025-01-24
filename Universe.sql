--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    has_life boolean,
    is_spherical boolean
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: garden; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.garden (
    garden_id integer NOT NULL,
    name character varying(30) NOT NULL,
    owner character varying(30) NOT NULL
);


ALTER TABLE public.garden OWNER TO freecodecamp;

--
-- Name: garden_garden_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.garden_garden_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.garden_garden_id_seq OWNER TO freecodecamp;

--
-- Name: garden_garden_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.garden_garden_id_seq OWNED BY public.garden.garden_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    has_life boolean,
    is_spherical boolean,
    diameter_in_km numeric(6,1) NOT NULL,
    planet_id integer NOT NULL
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age_in_millions_of_years integer NOT NULL,
    distance_from_earth integer NOT NULL,
    description text,
    has_life boolean,
    is_spherical boolean,
    star_id integer NOT NULL
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    has_life boolean,
    is_spherical boolean,
    galaxy_id integer NOT NULL
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_id_seq OWNER TO freecodecamp;

--
-- Name: star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_id_seq'::regclass);


--
-- Name: garden garden_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.garden ALTER COLUMN garden_id SET DEFAULT nextval('public.garden_garden_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'galaxy1', 'galaxy1', false, false);
INSERT INTO public.galaxy VALUES (2, 'galaxy2', 'galaxy2', false, true);
INSERT INTO public.galaxy VALUES (3, 'galaxy3', 'galaxy3', true, true);
INSERT INTO public.galaxy VALUES (4, 'galaxy4', 'galaxy4', true, false);
INSERT INTO public.galaxy VALUES (5, 'galaxy5', 'galaxy5', true, true);
INSERT INTO public.galaxy VALUES (6, 'galaxy6', 'galaxy6', false, true);


--
-- Data for Name: garden; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.garden VALUES (1, 'kluang', 'ONG');
INSERT INTO public.garden VALUES (2, 'sg', 'YEE');
INSERT INTO public.garden VALUES (3, 'KL', 'Wong');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'moon1a', 'moon1a', false, true, 11.0, 1);
INSERT INTO public.moon VALUES (2, 'moon1b', 'moon1b', false, true, 62.0, 1);
INSERT INTO public.moon VALUES (3, 'moon1c', 'moon1c', false, false, 21.0, 1);
INSERT INTO public.moon VALUES (4, 'moon1d', 'moon1d', false, false, 98.0, 1);
INSERT INTO public.moon VALUES (5, 'moon1e', 'moon1e', false, true, 9.0, 1);
INSERT INTO public.moon VALUES (6, 'moon2a', 'moon2a', false, true, 2.0, 2);
INSERT INTO public.moon VALUES (7, 'moon2b', 'moon2b', true, true, 200.0, 2);
INSERT INTO public.moon VALUES (8, 'moon2c', 'moon2c', false, true, 89.0, 2);
INSERT INTO public.moon VALUES (9, 'moon3a', 'moon3a', false, true, 29.0, 3);
INSERT INTO public.moon VALUES (10, 'moon3b', 'moon3b', false, false, 13.0, 3);
INSERT INTO public.moon VALUES (11, 'moon4a', 'moon4a', false, false, 9.0, 4);
INSERT INTO public.moon VALUES (12, 'moon5a', 'moon5a', false, false, 65.0, 5);
INSERT INTO public.moon VALUES (13, 'moon5b', 'moon5b', false, true, 31.0, 5);
INSERT INTO public.moon VALUES (14, 'moon6a', 'moon6a', false, true, 62.0, 6);
INSERT INTO public.moon VALUES (15, 'moon7a', 'moon7a', false, false, 8.0, 7);
INSERT INTO public.moon VALUES (16, 'moon7b', 'moon7b', false, false, 61.0, 7);
INSERT INTO public.moon VALUES (17, 'moon8a', 'moon8a', false, false, 99.0, 8);
INSERT INTO public.moon VALUES (18, 'moon9a', 'moon9a', false, false, 13.0, 9);
INSERT INTO public.moon VALUES (19, 'moon10a', 'moon10a', false, false, 32.0, 10);
INSERT INTO public.moon VALUES (20, 'moon11a', 'moon11a', false, false, 7.0, 11);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'planet1', 100, 100, 'planet1', false, false, 1);
INSERT INTO public.planet VALUES (2, 'planet2', 150, 50, 'planet2', false, false, 1);
INSERT INTO public.planet VALUES (3, 'planet3', 104, 62, 'planet3', false, true, 2);
INSERT INTO public.planet VALUES (4, 'planet4', 69, 27, 'planet4', true, true, 2);
INSERT INTO public.planet VALUES (5, 'planet5', 86, 246, 'planet5', false, true, 3);
INSERT INTO public.planet VALUES (6, 'planet6', 97, 294, 'planet6', false, false, 3);
INSERT INTO public.planet VALUES (7, 'planet7', 101, 101, 'planet7', false, false, 4);
INSERT INTO public.planet VALUES (8, 'planet8', 1500, 500, 'planet8', false, false, 4);
INSERT INTO public.planet VALUES (9, 'planet9', 1040, 620, 'planet9', false, true, 5);
INSERT INTO public.planet VALUES (10, 'planet10', 690, 270, 'planet10', true, true, 5);
INSERT INTO public.planet VALUES (11, 'planet11', 860, 2460, 'planet11', false, true, 6);
INSERT INTO public.planet VALUES (12, 'planet12', 970, 2940, 'planet12', false, false, 6);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'star1a', 'star1a', false, false, 1);
INSERT INTO public.star VALUES (2, 'star2a', 'star2a', false, true, 2);
INSERT INTO public.star VALUES (3, 'star1b', 'star1b', false, true, 1);
INSERT INTO public.star VALUES (4, 'star2b', 'star2b', false, true, 2);
INSERT INTO public.star VALUES (5, 'star3a', 'star3a', true, false, 3);
INSERT INTO public.star VALUES (6, 'star3b', 'star3b', false, false, 3);


--
-- Name: galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_id_seq', 6, true);


--
-- Name: garden_garden_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.garden_garden_id_seq', 3, true);


--
-- Name: moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_id_seq', 20, true);


--
-- Name: planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_id_seq', 12, true);


--
-- Name: star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_id_seq', 6, true);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: garden garden_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.garden
    ADD CONSTRAINT garden_name_key UNIQUE (name);


--
-- Name: garden garden_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.garden
    ADD CONSTRAINT garden_pkey PRIMARY KEY (garden_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: moon moon_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_star_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

