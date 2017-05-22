[![Build Status](https://travis-ci.org/mumuki/mumuki-bibliotheca.svg?branch=master)](https://travis-ci.org/mumuki/mumuki-bibliotheca)
[![Code Climate](https://codeclimate.com/github/mumuki/mumuki-bibliotheca/badges/gpa.svg)](https://codeclimate.com/github/mumuki/mumuki-bibliotheca)
[![Test Coverage](https://codeclimate.com/github/mumuki/mumuki-bibliotheca/badges/coverage.svg)](https://codeclimate.com/github/mumuki/mumuki-bibliotheca)
[![Issue Count](https://codeclimate.com/github/mumuki/mumuki-bibliotheca/badges/issue_count.svg)](https://codeclimate.com/github/mumuki/mumuki-bibliotheca)

# Mumuki Bibliotheca
> Storage and formatting web client for Mumuki content

## Preparing environment

1. Install [Vagrant](https://www.vagrantup.com/downloads.html) and [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
2. Run `curl https://raw.githubusercontent.com/mumuki/mumuki-devinstaller/master/install.sh | bash`
3. `cd mumuki && vagrant ssh` and then - **inside Vagrant VM** - `cd /vagrant/bibliotheca`
4. Go to [Installing and Running](#installing-and-running)


## Installing and Running

### Quick start

If you want to start the client quickly in developer environment,
you can just do the following:

```bash
./devstart
```

This will install your dependencies and boot the client.

### Manual start

Just install and start the client using `npm`:

```bash
npm install
npm start
```

# See also
[Bibliotheca API](https://github.com/mumuki/mumuki-bibliotheca-api)

## Authentication Powered by Auth0

<a width="150" height="50" href="https://auth0.com/" target="_blank" alt="Single Sign On & Token Based Authentication - Auth0"><img width="150" height="50" alt="JWT Auth for open source projects" src="http://cdn.auth0.com/oss/badges/a0-badge-dark.png"/></a>
