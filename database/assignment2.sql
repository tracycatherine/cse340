-- Insert Tony Stark into the account table
INSERT INTO public.account (
  account_first_name,
  account_last_name,
  account_email,
  account_password,
  account_type
)
VALUES (
  'Tony',
  'Stark',
  'tony.stark@starkindustries.com',
  'IamIronMan123!', -- In real applications, passwords should be hashed
  'Client'
);

-- Update Tony Stark’s account type to Admin
UPDATE public.account
SET account_type = 'Admin'
WHERE account_first_name = 'Tony' AND account_last_name = 'Stark';

-- Delete the account with ID 1
DELETE FROM public.account
WHERE account_id = 1;

-- Update the inventory description for item with ID 10
UPDATE public.inventory
SET inv_description = 'Do you have 6 kids and like to go offroading? The Hummer gives you a huge interiors with an engine to get you out of any muddy or rocky situation.'
WHERE inv_id = 10;

-- Replace part of the description for item with ID 10
SELECT REPLACE(inv_description, 'a huge interiors', 'the small interiors') 
FROM public.inventory 
WHERE inv_id = 10;

-- Select full inventory record for item with ID 10
SELECT * FROM public.inventory
WHERE inv_id = 10;

-- Select make, model, and classification for Sport vehicles
SELECT i.inv_make, i.inv_model, c.classification_name
FROM public.inventory i
INNER JOIN public.classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';