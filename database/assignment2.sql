-- Ensure the UPDATE statement references the correct column
UPDATE public.account
SET account_type = 'Admin'
WHERE account_first_name = 'Tony' AND account_last_name = 'Stark';

DELETE FROM public.account
WHERE account_id = 1;

UPDATE public.inventory
SET inv_description = 'Do you have 6 kids and like to go offroading? The Hummer gives you a huge interiors with an engine to get you out of any muddy or rocky situation.'
WHERE inv_id = 10;

SELECT REPLACE(inv_description, 'a huge interiors', 'the small interiors') 
FROM public.inventory 
WHERE inv_id = 10;

SELECT * FROM public.inventory
WHERE inv_id = 10;

SELECT i.inv_make, i.inv_model, c.classification_name
FROM public.inventory i
INNER JOIN public.classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';