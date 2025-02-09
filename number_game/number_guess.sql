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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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
-- Name: statistics; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.statistics (
    id integer NOT NULL,
    guess integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.statistics OWNER TO freecodecamp;

--
-- Name: statistics_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.statistics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.statistics_id_seq OWNER TO freecodecamp;

--
-- Name: statistics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.statistics_id_seq OWNED BY public.statistics.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(22) NOT NULL
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: statistics id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.statistics ALTER COLUMN id SET DEFAULT nextval('public.statistics_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: statistics; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.statistics VALUES (1, 10, 1);
INSERT INTO public.statistics VALUES (2, 20, 1);
INSERT INTO public.statistics VALUES (3, 5, 1);
INSERT INTO public.statistics VALUES (4, 754, 4);
INSERT INTO public.statistics VALUES (5, 263, 4);
INSERT INTO public.statistics VALUES (6, 398, 5);
INSERT INTO public.statistics VALUES (7, 143, 5);
INSERT INTO public.statistics VALUES (8, 660, 4);
INSERT INTO public.statistics VALUES (9, 562, 4);
INSERT INTO public.statistics VALUES (10, 229, 4);
INSERT INTO public.statistics VALUES (11, 861, 6);
INSERT INTO public.statistics VALUES (12, 306, 6);
INSERT INTO public.statistics VALUES (13, 631, 7);
INSERT INTO public.statistics VALUES (14, 303, 7);
INSERT INTO public.statistics VALUES (15, 312, 6);
INSERT INTO public.statistics VALUES (16, 528, 6);
INSERT INTO public.statistics VALUES (17, 29, 6);
INSERT INTO public.statistics VALUES (18, 3, 8);
INSERT INTO public.statistics VALUES (19, 3, 8);
INSERT INTO public.statistics VALUES (20, 483, 9);
INSERT INTO public.statistics VALUES (21, 558, 9);
INSERT INTO public.statistics VALUES (22, 495, 10);
INSERT INTO public.statistics VALUES (23, 156, 10);
INSERT INTO public.statistics VALUES (24, 784, 9);
INSERT INTO public.statistics VALUES (25, 590, 9);
INSERT INTO public.statistics VALUES (26, 346, 9);
INSERT INTO public.statistics VALUES (27, 703, 11);
INSERT INTO public.statistics VALUES (28, 965, 11);
INSERT INTO public.statistics VALUES (29, 893, 12);
INSERT INTO public.statistics VALUES (30, 607, 12);
INSERT INTO public.statistics VALUES (31, 855, 11);
INSERT INTO public.statistics VALUES (32, 305, 11);
INSERT INTO public.statistics VALUES (33, 175, 11);
INSERT INTO public.statistics VALUES (34, 81, 13);
INSERT INTO public.statistics VALUES (35, 587, 13);
INSERT INTO public.statistics VALUES (36, 1000, 14);
INSERT INTO public.statistics VALUES (37, 748, 14);
INSERT INTO public.statistics VALUES (38, 787, 13);
INSERT INTO public.statistics VALUES (39, 910, 13);
INSERT INTO public.statistics VALUES (40, 335, 13);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES (1, 'test');
INSERT INTO public.users VALUES (2, 'test1');
INSERT INTO public.users VALUES (3, 'TEST');
INSERT INTO public.users VALUES (4, 'user_1739080530929');
INSERT INTO public.users VALUES (5, 'user_1739080530928');
INSERT INTO public.users VALUES (6, 'user_1739080589157');
INSERT INTO public.users VALUES (7, 'user_1739080589156');
INSERT INTO public.users VALUES (8, 'ong');
INSERT INTO public.users VALUES (9, 'user_1739080765833');
INSERT INTO public.users VALUES (10, 'user_1739080765832');
INSERT INTO public.users VALUES (11, 'user_1739080778744');
INSERT INTO public.users VALUES (12, 'user_1739080778743');
INSERT INTO public.users VALUES (13, 'user_1739080817450');
INSERT INTO public.users VALUES (14, 'user_1739080817449');


--
-- Name: statistics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.statistics_id_seq', 40, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.users_user_id_seq', 14, true);


--
-- Name: statistics statistics_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.statistics
    ADD CONSTRAINT statistics_pkey PRIMARY KEY (id);


--
-- Name: users users_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: statistics statistics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.statistics
    ADD CONSTRAINT statistics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

