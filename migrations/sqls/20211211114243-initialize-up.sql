/* Replace with your SQL commands */

CREATE TABLE public.users (
    uid SERIAL PRIMARY KEY,
    email varchar(100) UNIQUE,
    password varchar(100),
    nickname varchar(50) UNIQUE
);

CREATE TABLE public.tags (
    id SERIAL PRIMARY KEY,
    creator integer REFERENCES public.users(uid) ON DELETE CASCADE,
    name varchar(50) UNIQUE,
    sortorder integer DEFAULT 0
);


CREATE TABLE public.user_tag (
    user_id integer REFERENCES public.users(uid) ON DELETE CASCADE,
    tag_id integer REFERENCES public.tags(id) ON DELETE CASCADE
);
