# Chart Component

this is


## Samples
```html

<select slot="left-content" id="chart-type">
  <option value="bar">bar</option>
  <option value="line">line</option>
  <option value="radar">radar</option>
  <option value="pie">pie</option>
  <option value="bubble">bubble</option>
  <option value="doughnut">doughnut</option>
  <option value="polarArea">polarArea</option>
  <option value="scatter">scatter</option>
</select>

<div slot="main" style="width: 300px;">
  
  <data-chart id="data-chart" type="line" >
    
    <data-set name="cat_1" label="yearly stuff 1">
      <data-point other="szs" year="2010" count="110" />
      <data-point year="2011" count="120" />
      <data-point year="2012" count="115" />
      <data-point year="2013" count="125" />
      <data-point year="2014" count="122" />
      <data-point year="2015" count="130" />
      <data-point year="2016" count="128" />
    <data-point year="2017" count="128" />
    <data-point year="2018" count="115" />
    <data-point year="2019" count="123" />
    <data-point year="2020" count="128" />
    <data-point year="2021" count="128" />
    <data-point year="2022" count="128" />
  </data-set>
  
  <data-set name="cat_2" label="yearly stuff 2">
    <data-point other="szs" year="2010" count="10" />
    <data-point year="2011" count="20" />
    <data-point year="2012" count="15" />
    <data-point year="2013" count="25" />
    <data-point year="2014" count="22" />
    <data-point year="2015" count="30" />
    <data-point year="2016" count="28" />
    <data-point year="2017" count="28" />
    <data-point year="2018" count="15" />
    <data-point year="2019" count="23" />
    <data-point year="2020" count="28" />
    <data-point year="2021" count="28" />
    <data-point year="2022" count="28" />
  </data-set>
  
  <data-set name="cat_3" label="third category">
    <data-point other="szs" year="2010" count="57" />
    <data-point year="2011" count="62" />
    <data-point year="2012" count="68" />
    <data-point year="2013" count="69" />
    <data-point year="2014" count="71" />
    <data-point year="2015" count="75" />
    <data-point year="2016" count="79" />
    <data-point year="2017" count="89" />
    <data-point year="2018" count="101" />
    <data-point year="2019" count="120" />
    <data-point year="2020" count="140" />
    <data-point year="2021" count="145" />
    <data-point year="2022" count="160" />
  </data-set>
  
</data-chart>

```