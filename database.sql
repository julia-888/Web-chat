--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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

--
-- Name: chat; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA chat;


ALTER SCHEMA chat OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: messages; Type: TABLE; Schema: chat; Owner: postgres
--

CREATE TABLE chat.messages (
    id_of_message bigint NOT NULL,
    text_of_message text,
    sender_name text,
    time_of_sending text NOT NULL,
    date_of_sending text
);


ALTER TABLE chat.messages OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: chat; Owner: postgres
--

ALTER TABLE chat.messages ALTER COLUMN id_of_message ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME chat.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: messages; Type: TABLE DATA; Schema: chat; Owner: postgres
--

COPY chat.messages (id_of_message, text_of_message, sender_name, time_of_sending, date_of_sending) FROM stdin;
17	Привет!	Фархад	13:43:47	11.06.2023
18	Привет!	Илья	13:44:10	11.06.2023
19	Привет!	Федя	13:46:28	11.06.2023
20	Привет!	Анти-спамник	13:47:20	11.06.2023
21	Привет!	Анти-спамник	13:47:34	11.06.2023
22	Привет!	Анти-спамник	13:48:04	11.06.2023
23	Привет!	Юля	13:54:28	11.06.2023
24	Привет!	Юля	13:55:20	11.06.2023
25	Привет!	Миша	13:55:44	11.06.2023
26	Привет!	Миша	13:56:04	11.06.2023
27	Привет!	Илья	13:56:53	11.06.2023
28	Привет!	Фархад	14:08:05	11.06.2023
31	Привет!	Фархад	12:41:58	12.06.2023
39	Привет!	Миша	13:48:42	12.06.2023
40	Привет!	Катя	13:53:25	12.06.2023
41	Привет!	Гриша	13:53:40	12.06.2023
42	Привет!	Катя	13:53:54	12.06.2023
43	Привет!	Яна	13:54:05	12.06.2023
44	Привет!	Катя	13:54:14	12.06.2023
45	Привет!	Яна	13:54:23	12.06.2023
46	Привет!	Гриша	13:54:45	12.06.2023
47	Привет!	Миша	13:55:15	12.06.2023
48	Привет!	Катя	14:15:22	12.06.2023
49	Привет!	Катя	14:15:36	12.06.2023
50	Привет!	Юля	14:15:48	12.06.2023
51	Привет!	Юля	14:15:57	12.06.2023
52	Привет!	Катя	14:17:13	12.06.2023
53	Привет!	Гриша	14:17:54	12.06.2023
54	Привет!	Катя	14:18:07	12.06.2023
55	Привет!	Гриша	14:18:16	12.06.2023
56	Привет!	Влад	14:18:58	12.06.2023
57	Привет!	Гриша	14:19:18	12.06.2023
58	Привет!	Влад	14:19:45	12.06.2023
59	Привет!	Катя	14:19:57	12.06.2023
60	Привет!	Витя	12:54:37	13.06.2023
61	Привет!	Катя	12:55:08	13.06.2023
62	Привет!	Гриша	12:56:08	13.06.2023
63	Привет!	Гриша	12:56:23	13.06.2023
64	Привет!	Витя	12:56:38	13.06.2023
65	Привет!	Гриша	12:56:56	13.06.2023
66	Привет!	Катя	12:57:17	13.06.2023
67	Привет!	Катя	12:57:50	13.06.2023
68	Привет!	Ирина	13:00:23	13.06.2023
69	Привет!	Гриша	13:01:01	13.06.2023
70	Привет!	Ирина	13:01:18	13.06.2023
71	Привет!	Гриша	13:02:38	13.06.2023
72	Привет!	Миша	13:04:04	13.06.2023
73	Привет!	Гриша	13:04:37	13.06.2023
74	Привет!	Оля	12:09:14	14.06.2023
75	Привет!	Оля	12:48:37	14.06.2023
76	Привет!	Юля	13:01:13	14.06.2023
77	Привет!	Юля	13:01:18	14.06.2023
78	Привет!	Петя	13:10:20	14.06.2023
79	как дела?	Витя	09:40:55	15.06.2023
80	как дела?	Яна	09:41:22	15.06.2023
81	как дела?	Маша	09:41:28	15.06.2023
82	как дела?	Вика	09:41:31	15.06.2023
83	ок	Витя	09:41:54	15.06.2023
84	ок	Яна	09:42:02	15.06.2023
85	ок	Маша	09:42:09	15.06.2023
86	Привет!	Влад	09:42:37	15.06.2023
87	Привет!	Маша	09:42:46	15.06.2023
88	Привет!	Яна	09:42:52	15.06.2023
89	Привет, Влад!	Витя	09:42:59	15.06.2023
90	Привет, Влад!	Вика	09:43:06	15.06.2023
91	как дела?	Влад	09:43:32	15.06.2023
92	хорошо	Вика	09:43:41	15.06.2023
93	Привет!	Яна	09:43:57	15.06.2023
1	Привет!	Яна	18:30:37	10.06.2023
2	Привет!	Юля	18:44:17	10.06.2023
3	Привет!	Аня	18:56:56	10.06.2023
4	Привет!	Гриша	19:39:20	10.06.2023
5	Привет!	Арина	19:40:05	10.06.2023
6	Привет!	Гриша	19:40:15	10.06.2023
7	Привет!	Миша	19:54:56	10.06.2023
8	Привет!	Миша	19:59:14	10.06.2023
9	Привет!	Катя	20:05:02	10.06.2023
10	Привет!	Федя	20:05:35	10.06.2023
11	Привет!	Катя	20:10:00	10.06.2023
12	Привет!	Юля	20:10:39	10.06.2023
13	Привет!	Катя	20:10:49	10.06.2023
14	Привет!	Гриша	20:11:29	10.06.2023
15	Привет!	Миша	20:12:03	10.06.2023
16	Привет!	Юля	20:12:37	10.06.2023
29	Привет!	Федя	14:08:43	11.06.2023
30	Привет!	Федя	14:13:23	11.06.2023
32	Привет!	Витя	12:43:15	12.06.2023
33	Привет!	Илья	12:46:27	12.06.2023
34	Привет!	Яна	12:50:53	12.06.2023
35	Привет!	Миша	12:51:45	12.06.2023
36	Привет!	Аня	13:07:31	12.06.2023
37	Привет!	Юля	13:17:27	12.06.2023
38	Привет!	Миша	13:48:27	12.06.2023
114	5	Юля	10:39:33	15.06.2023
94	Привет!	Гриша	09:44:17	15.06.2023
95	Привет, Влад!	Миша	09:44:48	15.06.2023
96	Привет!	Маша	09:45:34	15.06.2023
97	Привет!	Катя	09:45:40	15.06.2023
98	Привет!	Миша	09:45:46	15.06.2023
99	Привет!	Гриша	09:45:50	15.06.2023
100	как дела?	Миша	09:46:00	15.06.2023
101	хорошо	Гриша	09:46:26	15.06.2023
102	хорошо	Катя	09:46:35	15.06.2023
103	хорошо	Маша	09:46:37	15.06.2023
104	Всем пока!	Гриша	09:46:46	15.06.2023
105	Спасибо за интересную беседу!	Миша	09:46:56	15.06.2023
106	Пока	Миша	09:47:00	15.06.2023
107	Всем пока!	Катя	09:47:10	15.06.2023
108	Всем пока!	Маша	09:47:14	15.06.2023
109	Пока!	Фархад	09:47:27	15.06.2023
110	Спасибо за встречу!	Влад	09:47:53	15.06.2023
111	Пока	Влад	09:47:57	15.06.2023
112	Пока	Иван	09:48:07	15.06.2023
113	Пока	Митя	09:48:51	15.06.2023
115	Пока	Аня	10:46:22	15.06.2023
116	Пока	Юля	10:54:29	15.06.2023
\.


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: chat; Owner: postgres
--

SELECT pg_catalog.setval('chat.messages_id_seq', 116, true);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id_of_message);


--
-- PostgreSQL database dump complete
--

