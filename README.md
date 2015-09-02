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

## Configure AWS S3
grab AWS_SECRET_ACCESS_KEY and AWS_ACCESS_KEY_ID from heroku (heroku config -a scape-dev)
add exports in your .bash_profile to add these environment variables

## Running the dev server

```sh
bundle exec rails s
```

Then kindly navigate your internet browser to
<http://localhost:3000/UI/index.html#/home>
and enjoy the pleasant application therein.

## Heroku

Visit https://scape-dev.herokuapp.com/UI/index.html#home to see the app live.