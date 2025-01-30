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

DROP DATABASE worldcup;
--
-- Name: worldcup; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE worldcup WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE worldcup OWNER TO freecodecamp;

\connect worldcup

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
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    round character varying(30) NOT NULL,
    year integer NOT NULL,
    winner_id integer NOT NULL,
    opponent_id integer NOT NULL,
    winner_goals integer NOT NULL,
    opponent_goals integer NOT NULL
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.teams (
    team_id integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.teams OWNER TO freecodecamp;

--
-- Name: teams_team_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.teams_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_team_id_seq OWNER TO freecodecamp;

--
-- Name: teams_team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.teams_team_id_seq OWNED BY public.teams.team_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: teams team_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams ALTER COLUMN team_id SET DEFAULT nextval('public.teams_team_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (4, 'Final', 2018, 8, 9, 4, 2);
INSERT INTO public.games VALUES (5, 'Third Place', 2018, 10, 11, 2, 0);
INSERT INTO public.games VALUES (6, 'Semi-Final', 2018, 9, 11, 2, 1);
INSERT INTO public.games VALUES (7, 'Semi-Final', 2018, 8, 10, 1, 0);
INSERT INTO public.games VALUES (8, 'Quarter-Final', 2018, 9, 12, 3, 2);
INSERT INTO public.games VALUES (9, 'Quarter-Final', 2018, 11, 13, 2, 0);
INSERT INTO public.games VALUES (10, 'Quarter-Final', 2018, 10, 14, 2, 1);
INSERT INTO public.games VALUES (11, 'Quarter-Final', 2018, 8, 15, 2, 0);
INSERT INTO public.games VALUES (12, 'Eighth-Final', 2018, 11, 16, 2, 1);
INSERT INTO public.games VALUES (13, 'Eighth-Final', 2018, 13, 17, 1, 0);
INSERT INTO public.games VALUES (14, 'Eighth-Final', 2018, 10, 18, 3, 2);
INSERT INTO public.games VALUES (15, 'Eighth-Final', 2018, 14, 19, 2, 0);
INSERT INTO public.games VALUES (16, 'Eighth-Final', 2018, 9, 20, 2, 1);
INSERT INTO public.games VALUES (17, 'Eighth-Final', 2018, 12, 21, 2, 1);
INSERT INTO public.games VALUES (18, 'Eighth-Final', 2018, 15, 22, 2, 1);
INSERT INTO public.games VALUES (19, 'Eighth-Final', 2018, 8, 23, 4, 3);
INSERT INTO public.games VALUES (20, 'Final', 2014, 24, 23, 1, 0);
INSERT INTO public.games VALUES (21, 'Third Place', 2014, 25, 14, 3, 0);
INSERT INTO public.games VALUES (22, 'Semi-Final', 2014, 23, 25, 1, 0);
INSERT INTO public.games VALUES (23, 'Semi-Final', 2014, 24, 14, 7, 1);
INSERT INTO public.games VALUES (24, 'Quarter-Final', 2014, 25, 26, 1, 0);
INSERT INTO public.games VALUES (25, 'Quarter-Final', 2014, 23, 10, 1, 0);
INSERT INTO public.games VALUES (26, 'Quarter-Final', 2014, 14, 16, 2, 1);
INSERT INTO public.games VALUES (27, 'Quarter-Final', 2014, 24, 8, 1, 0);
INSERT INTO public.games VALUES (28, 'Eighth-Final', 2014, 14, 27, 2, 1);
INSERT INTO public.games VALUES (29, 'Eighth-Final', 2014, 16, 15, 2, 0);
INSERT INTO public.games VALUES (30, 'Eighth-Final', 2014, 8, 28, 2, 0);
INSERT INTO public.games VALUES (31, 'Eighth-Final', 2014, 24, 29, 2, 1);
INSERT INTO public.games VALUES (32, 'Eighth-Final', 2014, 25, 19, 2, 1);
INSERT INTO public.games VALUES (33, 'Eighth-Final', 2014, 26, 30, 2, 1);
INSERT INTO public.games VALUES (34, 'Eighth-Final', 2014, 23, 17, 1, 0);
INSERT INTO public.games VALUES (35, 'Eighth-Final', 2014, 10, 31, 2, 1);


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.teams VALUES (8, 'France');
INSERT INTO public.teams VALUES (9, 'Croatia');
INSERT INTO public.teams VALUES (10, 'Belgium');
INSERT INTO public.teams VALUES (11, 'England');
INSERT INTO public.teams VALUES (12, 'Russia');
INSERT INTO public.teams VALUES (13, 'Sweden');
INSERT INTO public.teams VALUES (14, 'Brazil');
INSERT INTO public.teams VALUES (15, 'Uruguay');
INSERT INTO public.teams VALUES (16, 'Colombia');
INSERT INTO public.teams VALUES (17, 'Switzerland');
INSERT INTO public.teams VALUES (18, 'Japan');
INSERT INTO public.teams VALUES (19, 'Mexico');
INSERT INTO public.teams VALUES (20, 'Denmark');
INSERT INTO public.teams VALUES (21, 'Spain');
INSERT INTO public.teams VALUES (22, 'Portugal');
INSERT INTO public.teams VALUES (23, 'Argentina');
INSERT INTO public.teams VALUES (24, 'Germany');
INSERT INTO public.teams VALUES (25, 'Netherlands');
INSERT INTO public.teams VALUES (26, 'Costa Rica');
INSERT INTO public.teams VALUES (27, 'Chile');
INSERT INTO public.teams VALUES (28, 'Nigeria');
INSERT INTO public.teams VALUES (29, 'Algeria');
INSERT INTO public.teams VALUES (30, 'Greece');
INSERT INTO public.teams VALUES (31, 'United States');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 35, true);


--
-- Name: teams_team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.teams_team_id_seq', 31, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: teams teams_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_name_key UNIQUE (name);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (team_id);


--
-- Name: games games_opponent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_opponent_id_fkey FOREIGN KEY (opponent_id) REFERENCES public.teams(team_id);


--
-- Name: games games_winner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_winner_id_fkey FOREIGN KEY (winner_id) REFERENCES public.teams(team_id);


--
-- PostgreSQL database dump complete
--

