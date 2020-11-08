FROM fluent/fluentd:edge-debian

USER root
RUN apt update \
    && apt install -y \
        ruby-dev \
        build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && fluent-gem install \
        fluent-plugin-mongo
