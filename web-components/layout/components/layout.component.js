(function (module) {

    class AppLayout extends HTMLElement {

        constructor() {
            super()
        }

        async _render() {
            // const baseUrl = useLocal? './' : 'https://d2frjh5xr2nc8a.cloudfront.net/'
            const inner = await html.import(baseUrl + 'layout/components/layout-component.html')
            //     const inner = await Promise.resolve(html`<style>

            //     *{
            //         /* Amazon pallete */

            //         --amz-blck-1:#16191F;
            //         --amz-blck-2:#232F3E;
            //         --amz-gray-1 :#545B64;
            //         --amz-gray-2 :#687078;

            //         --amz-blue-1 :#306DA3;
            //         --amz-blue-2 :#0073BB;
            //         --amz-turq-1 :#44B9C6;

            //         --amz-orang-1:#EC7211;

            //         /* Tonos grises */
            //         --black-1:#252525;
            //         --black-2:#323437;
            //         --black-3:#474b4e;

            //         /* Tonos claros */
            //         --white-1:#e2e7ed;
            //         --white-2:#c4c7cc;
            //         --white-3:#95989d;

            //         /* Tonos de color */
            //         --main-1:#52c9e0; /* hsl(190, 70%, 60%) */
            //         --main-2:#82d3e3; /* hsl(190, 65%, 70%) */
            //         --main-3:#addfeb; /* hsl(190, 60%, 80%) */
            //         box-sizing: border-box;


            //     }

            //     .flex-row {
            //         display: flex;
            //         flex-direction: row;
            //     }
            //     .flex-column {
            //         display: flex;
            //         flex-direction: column;
            //     }
            //     .space-around {
            //         justify-content: space-around;
            //     }
            //     .space-evenly {
            //         justify-content: space-evenly;
            //     }
            //     .space-between {
            //         justify-content: space-between;
            //     }
            //     .justify-center{
            //         justify-content: center
            //     }
            //     .align-center{
            //         align-items: center;
            //     }
            //     .grid {
            //         display: grid;
            //     }
            //     .hidden {
            //         display: none;
            //     }

            //     /* ⚠️ Estilos básicos ⚠️ */

            //     .super-container{
            //         height:100%;

            //         font-family: 'amazon-ember';
            //     }


            //     .top-menu{
            //         height: 10%;
            //         padding: 12px;

            //         background-color: var(--amz-blck-1);
            //     }


            //     .lt-container{
            //         max-width: 90%;
            //         padding: 12px 18px;

            //         border-radius: 6px;

            //         color: var(--amz-turq-1);

            //         overflow-y: auto;

            //         background-color: var(--amz-blck-2);
            //     }
            //     .lt-container::-webkit-scrollbar {
            //         -webkit-appearance: none;
            //     }

            //     .lt-container::-webkit-scrollbar:horizontal {
            //         height: 14px;
            //     }

            //     .lt-container::-webkit-scrollbar-thumb {
            //         background-color: #82d3e365;
            //         border: 5px solid var(--black-1);
            //         border-radius: 8px;
            //     }

            //     .lt-container::-webkit-scrollbar-track {
            //         border-radius:0 0 4px 4px;  
            //         background-color: transparent;
            //     }

            //     .mid-container{
            //         height: 86%;
            //     }

            //     .left-menu{
            //         width: 25%;
            //         padding: 12px;

            //         color: var(--white-1);

            //         background-color: var(--amz-blck-2);
            //     }

            //     .main-content{
            //         width: 76%;
            //         background-color: var(--white-1);
            //     }
            //     .pattern-1{
            //         background-color: var(--white-3);
            //         background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
            //     }


            //     .footer{
            //         /* Fondo */
            //         background-color: var(--amz-blck-1);
            //         color: var(--amz-turq-1);

            //         /* Tamaño */
            //         height: 4%;
            //         padding: 12px;
            //     }



            // </style>

            // <section class="super-container">

            //     <div class="top-menu flex-row justify-center">

            //         <div class="lt-container flex-row space-evenly align-center">

            //             <slot  name="top-menu">


            //             </slot>

            //         </div>

            //     </div>

            //     <div class="mid-container flex-row ">

            //         <div class="left-menu flex-column">

            //             <slot name="left-menu">


            //             </slot>

            //         </div>
            //         <div class="main-content flex-column align-center pattern-1">

            //             <slot name="main-content"></slot>

            //         </div>

            //     </div>
            //     <div class="footer flex-row space-around align-center">

            //         <slot name="footer">footer</slot>

            //     </div>

            // </section>        
            // `)

            const shadow = this.attachShadow({ mode: 'open' })
            shadow.appendChild(inner)

            // const inner = await html.import('test.component.html')

            // replacing inline handler function with own component methods
            mapComponentEvents(this, eventNames)

            // get variable names
            updateVars(this)
        }

        connectedCallback() { this._render() }

        disconnectedCallback() { }

        attributeChangedCallback(name, oldValue, newValue) { }

        adoptedCallback() { }

    }

    window.customElements.define('app-layout', AppLayout)


    module.exports = AppSyncMutation

})(module)