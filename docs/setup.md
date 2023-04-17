# SetUp
1. Open a terminal window and create a folder we will use for this lab. The name doesn't matter.
2. Now change directory into that folder.
3. Run the following command - `npx dwck project web-components-app` - and hit `y` when asked to confirm. This will deploy the project structure for our lab into this folder. 
4. Now change directory into the `web-components-app` folder and run `npm install -D`
5. Open the `web-components-app` folder in your code editor of choice.
6. Create an `index.html` file in the root of this folder, add the following contents and save:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```
7. Finally, run `npm run serve`. This will open a browser with the contents of the `index.html` file you just created (which is actually an empty page).

**Notes:** 
1. In Lessons 1 and 2, unless explicitly directed otherwise, we will be working in the `index.html` file we just created above.
2. If we see a reference like this `tag-name#id-for-this-element`, this measn you should look to add your code in the element that match and has the respective id. Example, if we are told to add a `h1` on `flip-card#main-card`:
   ```html
    <flip-card id="third-card"></flip-card>
    <flip-card id="second-card"></flip-card>

    <!-- this is the one you want to use -->
    <flip-card id="main-card"></flip-card>

   ```
   the format will be `<component tag>#<id for the component>`.


