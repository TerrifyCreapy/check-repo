# Check repositories application

Application was created for checking repositories gitlab of internal project.
This app can show information about "merge-request"'s count, "feature branch" count, is different dev and master branches and pipeline status.

<details>
  <summary>To run this application locally</summary>
  <ol>
    <li>Download this project</li>
    <li>Run command npm/yarn install to install all dependencies</li>
    <li>After installation of dependencies run command npm/yarn start</li>
    <li>The application will started on http://localhost:PORT / http://127.0.0.1:PORT (Basically port is 3000 but can be any other)</li>
  </ol>
</details>

## The requirements to file

The type of file must be json.
The structure of this file must be the next: <br>
{<br>
  "product": {<br>
    "internal_product_name": "name",<br>
    "product_description": "description",<br>
    "product_id": "id",<br>
    "product_name": "name",<br>
    "release_date": "date",<br>
    "release_version": "version"<br>
  },<br>
  "x_deb_projects": {<br>
    "project": "project-path" // project path is every symbol after https://gitlab.com/<br>
  }<br>
}<br>

## Techologies
<ul>
  <li>ReactJS</li>
  <li>TypeScript</li>
  <li>Mobx</li>
  <li>MaterialUI</li>
  <li>Axios</li>
  <li>SCSS</li>
  <li>Localforage</li>
  <li>GITLAB Api</li>
</ul>

<details>
  <summary>The demonstration of this project</summary>
  The main page is Auth page. It require email and password to connect to Gitlab
  
  ![image](https://github.com/user-attachments/assets/4235241c-1d05-4586-a294-7e1bebe390c0)
  
  Using wrong email or password causes pop-up notification
  
  ![image](https://github.com/user-attachments/assets/356d42d0-a0d5-4cad-851a-b0922f441b2a)
  
  Second page contains header with name of page, button to add project and icon of profile.
  
  ![image](https://github.com/user-attachments/assets/90f1c39a-ae18-4d4a-97ce-a5efe1233ee5)
  
  The third page contains header with name of project, types of sorting, reload and back buttons and card with project list.
  
  ![image](https://github.com/user-attachments/assets/390eb4e9-4e7c-4970-a48f-36ec4a794162)
  
</details>
