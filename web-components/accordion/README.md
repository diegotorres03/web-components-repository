
# Definition

**As defined by the W3C:**

An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.






## Example
```html
<app-accordion>
    <section>
        <h3>this will be the title of the label</h3>
        <p>add any valid html here, this will be the main content of this section</p>
    </section>

    <section>
        <h4>this will be other tab on the accordion</h4>
        <p>add any valid html here, this will be the main content of this section</p>
    </section>
</app-accordion>   
```




## Notes
use a `<section>` tag to specify a new entry
use an `<h*>` tag to take its text context and use it on the lable