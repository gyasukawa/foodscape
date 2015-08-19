# Foodscape

## Installation

```sh
npm install
bower install
bundle install
bundle exec rake db:setup
grunt build --force
```

Currently the `--force` flag is required because `Gruntfile.js`
appears to ignore options like `laxcommas` for unknown reasons.

## Running the dev server

```sh
bundle exec rails s
```

Then kindly navigate your internet browser to
<http://localhost:3000/UI/index.html#/home>
and enjoy the pleasant application therein.

## Heroku

Visit https://quiet-harbor-5141.herokuapp.com/UI/index.html#home to see the app live.

## Devise Setup Instructions

Some setup you must do manually if you haven't yet:

  1. Ensure you have defined default url options in your environments files. Here
     is an example of default_url_options appropriate for a development environment
     in config/environments/development.rb:

     ```sh
     config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
     ```sh

     In production, :host should be set to the actual host of your application.

  2. Ensure you have defined root_url to *something* in your config/routes.rb.
     For example:

      ```sh
      root to: "home#index"
      ```sh

  3. Ensure you have flash messages in app/views/layouts/application.html.erb.
     For example:

     ```sh
     <p class="notice"><%= notice %></p>
     <p class="alert"><%= alert %></p>
     ```sh

  4. If you are deploying on Heroku with Rails 3.2 only, you may want to set:

    ```sh
    config.assets.initialize_on_precompile = false
    ```sh

     On config/application.rb forcing your application to not access the DB
     or load models when precompiling your assets.

  5. You can copy Devise views (for customization) to your app by running:

      ```sh
     rails g devise:views
     ```sh


