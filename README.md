#Getting Started with Module Federation and Angular
**Important**: This code is written in Angular CLI 14** and higher.I have created a simple applictaion with basic UI. In this appilication I have created a container, MF1 -> Micro frontend one (access app module) and MFE2 -> Second Micro frontend created two moduled like student and employee and access that in container module.

##Part 1: Steps to run

1. Clone the starterkit for this tutorial:

   https://github.com/harshal77/micro-frontend --branch development

2. Move into the project directory and install the dependencies of each micro fronend 

    ```
    cd container
    npm i
    cd mfe1
    npm i
    cd mfe2
    npm i
    ```

3. Start the container (Port 4200) app first then other micro fronends like mfe1 (Port 4201), mfe2 (Port 4202).



## Part 2: How to add module federation


1. Install ``@angular-architects/module-federation`` into the conatiner and into the micro frontend:

    ```
    ng add @angular-architects/module-federation --project mfe1 --type remote --port 4201
    ng add @angular-architects/module-federation --project mfe2 --type remote --port 4202

    ```
    or you can simply add module federation in each app independently using following command this will ask port number and project name.
    
    ```
    ng add @angular-architects/module-federation 
    ```


3. Switch into the project ``mfe1`` and open the generated configuration file ``webpack.config.js``. It contains the module federation configuration for ``mfe1``. In the exposes object you have to add whichever module you have to expose or access other MF's ex):

    ```javascript
    const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

    module.exports = withModuleFederationPlugin({

        name: 'mfe1',
        filename: "remoteEntry.js",
        exposes: {
            './Module': './mfe1/src/app/app.module.ts'
        },
        shared: {
            ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
        },

    });
    ```

    Here I  exposes the ``app module`` under the Name ``./Module``. Hence, the container can use this path to load it.
    Note. If you want to expose app module make sure in routing file you have to use RouterModule.forChild(routes) istend of      RouterModule.forRoot(routes).

3. We can access MF1 module two ways in container applictaion. .

  
3.1) Switch into the ``Container`` app and open the file ``webpack.config.js``
    ```javascript
    const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

    module.exports = withModuleFederationPlugin({

        remotes: {
            "mfe1": "http://localhost:4201/remoteEntry.js",    
        },

        shared: {
            ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
        },

    });
    ```


3.2) Switch into the ``Container`` app and open the file ``routing file``

    ```javascript
    {
    path: 'mfe-1',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './MF1'
      })
        .then((m: any) => m.AppModule)
  },
    ```

    Please note that the imported URL consists of the names defined in the configuration files above.
  

## Part 3: Try it out

Now, let's try it out!

1. Start the ``container``,  ``mfe1`` and ``mfe2`` side by side:

    ```
    ng serve container -o
    ng serve mfe1 -o
    ng serve mfe2 -o
    ```


4. The container should still be able to load the micro frontend.
https://webpack.js.org/concepts/module-federation/
