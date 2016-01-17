FROM node:5


RUN mkdir -p /_src


COPY package.json /_src/package.json


# RUN cd /_src && npm install


COPY . /_src


RUN cd /_src && npm install 
RUN cd /_src && npm ln 
# RUN chmod +x /_src/bin/td.js
# RUN ln -s /_src /usr/local/lib/node_modules/td.js
# RUN ln -s /usr/local/lib/node_modules/td.js/bin/td.js /usr/local/bin/td

RUN chmod +x `which td`
RUN useradd -ms /bin/bash tduser
USER tduser
WORKDIR /home/tduser

# RUN which env
# RUN which td
# RUN node `which td`
RUN td
# RUN echo ${PATH}
# RUN ls -la /usr/local/bin
# RUN PACH="${PATH}:/usr/local/lib" sh -c "td"
# RUN /usr/local/bin/td
# RUN td
# RUN which node
# RUN node "/usr/local/lib/node_modules/td.js/bin/td.js"
# RUN node "/usr/local/bin/td"
# RUN "/usr/local/bin/td"

