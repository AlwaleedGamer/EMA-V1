const logger = require("./utils/log");
const chalk = require("chalk");
const cv = chalk.bold.hex("#1390f0");
const gradient = require("gradient-string")
const logo = `
  ███████╗███╗   ███╗ █████╗ 
  ██╔════╝████╗ ████║██╔══██╗
  █████╗  ██╔████╔██║███████║
  ██╔══╝  ██║╚██╔╝██║██╔══██║
  ███████╗██║ ╚═╝ ██║██║  ██║
  ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝
  THE EMA BOT BY DRIDI & ABDEL-RAHMAN
`;

const c = ["cyan", "#7D053F"];
const redToGreen = gradient("red", "cyan");
console.log(redToGreen("━".repeat(50), { interpolation: "hsv" }));
const text = gradient(c).multiline(logo);
console.log(text);
console.log(redToGreen("━".repeat(50), { interpolation: "hsv" }));

console.log(cv(`\n` + `──LOADING STARTER─●`));


logger.log([
  {
  message: "[ STARTER ]: ",
   color: ["red", "cyan"],
  },
  {
  message: `Getting Started`,
  color: "white",
  },
]);

const { spawn } = require('child_process');
const Fastify = require('fastify');
const fastifyStatic = require('@fastify/static'); 
class EmaA {
  constructor() {
    this.app = Fastify();
    this.PORT = process.env.PORT || 3000;
    this.countRestart = 0;
    this.child = null;
    this.init();
  }

  init() {
    this.startApp();
    this.startBot();
  }

  startApp() {
    this.app.get("/", (req, reply) => {
      reply.send("HI I'M EMA...(≧▽≦)")
    });

    const listenOptions = {
      port: this.PORT,
      host: '0.0.0.0',
    };

    this.app.listen(listenOptions, (err, address) => {
      if (err) {
        logger.log([
          {
          message: "[ SERVER ]: ",
           color: ["red", "red"],
          },
          {
          message: `Error starting server: ${err}`,
          color: "white",
          },
        ]);
        process.exit(1);
      }
      logger.log([
        {
        message: "[ SERVER ]: ",
         color: ["red", "cyan"],
        },
        {
        message: `App deployed on port ${this.PORT}`,
        color: "white",
        },
      ]);
    });
  }
  startBot() {
    const options = {
      cwd: __dirname,
      stdio: "inherit",
      shell: true,
    };
    this.child = spawn(
      "node",
      [ "--trace-deprecation", "--trace-warnings", "--async-stack-traces", "EMA.js"],
      options
    );
    this.child.on("close", (codeExit) => {
      if (codeExit !== 0 && this.countRestart < 5) {
        this.countRestart += 1;
        this.startBot();
      }
    });
    this.child.on("error", (error) => {
      console.error("An error occurred: " + JSON.stringify(error), "error");
    });
  }
}

const Ema  = new EmaA(); 
