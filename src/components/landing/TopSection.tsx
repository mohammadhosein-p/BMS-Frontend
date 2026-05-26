import { motion } from "framer-motion";
import Ok from "@/assets/landing/ok.svg";


function TopSection() {
  return (
      <section className="relative py-[12vw] overflow-hidden">
          {/* Quotation */}
          <div className="absolute right-2/5 -translate-x-1/2 top-[10%] lg:top-[20%]">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="82"
                  height="63"
                  viewBox="0 0 82 63"
              >
                  <path
                      d="M50.126,63A74.12,74.12,0,0,1,45,35.627q0-15.858,8.582-25.743T78.88,0V15.424q-12.037,0-12.037,15.424v2.824H82V63Zm-45,0A77.572,77.572,0,0,1,0,35.627Q0,19.769,8.582,9.885T33.88,0V15.424q-11.814,0-11.813,15.424v2.824H37V63Z"
                      fill="#4db6ac"
                  />
              </svg>
          </div>

          {/* Ring */}
          <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
              className="absolute right-[2%] top-[20%] hidden md:block"
          >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 163 163"
                  className="w-[7vw] min-w-[70px] max-w-[100px] h-auto"
              >
                  <g
                      fill="none"
                      stroke="#717cff"
                      strokeMiterlimit="10"
                      strokeWidth="14"
                  >
                      <circle cx="81.5" cy="81.5" r="81.5" stroke="none" />
                      <circle cx="81.5" cy="81.5" r="74.5" fill="none" />
                  </g>
              </svg>
          </motion.div>

          {/* Green Triangle */}
          <div className="absolute right-[10%] top-[52%] hidden md:block">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42.968"
                  height="42.968"
                  viewBox="0 0 42.968 42.968"
              >
                  <g
                      transform="translate(-10.581 24.067) rotate(-45)"
                      fill="none"
                      strokeMiterlimit="10"
                  >
                      <path
                          d="M17.127,10.533a9,9,0,0,1,14.746,0l7.214,10.306A9,9,0,0,1,31.714,35H17.286A9,9,0,0,1,9.913,20.839Z"
                          stroke="none"
                      />

                      <path
                          d="M 24.5 10.69413566589355 C 22.84558486938477 10.69413566589355 21.35258483886719 11.47146415710449 20.40384292602539 12.82682037353516 L 13.18974304199219 23.1326789855957 C 12.100341796875 24.68897819519043 11.97371292114258 26.62406349182129 12.85100173950195 28.30904960632324 C 13.72829818725586 29.9940357208252 15.38619995117188 30.99999237060547 17.2859001159668 30.99999237060547 L 31.7140998840332 30.99999237060547 C 33.61380004882812 30.99999237060547 35.27169799804688 29.9940357208252 36.14900207519531 28.30904960632324 C 37.02628707885742 26.62406349182129 36.899658203125 24.68897819519043 35.81025695800781 23.1326789855957 L 28.59615707397461 12.82682037353516 C 27.64741516113281 11.47146415710449 26.15441513061523 10.69413566589355 24.5 10.69413566589355 M 24.5 6.694133758544922 C 27.29081344604492 6.694133758544922 30.08162879943848 7.973751068115234 31.87308502197266 10.53297805786133 L 39.08718490600586 20.83883476257324 C 43.26268768310547 26.80383491516113 38.99531555175781 34.99999237060547 31.7140998840332 34.99999237060547 L 17.2859001159668 34.99999237060547 C 10.00468444824219 34.99999237060547 5.737316131591797 26.80383491516113 9.912815093994141 20.83883476257324 L 17.12691497802734 10.53297805786133 C 18.91837120056152 7.973751068115234 21.70918655395508 6.694133758544922 24.5 6.694133758544922 Z"
                          fill="#4db6ac"
                      />
                  </g>
              </svg>
          </div>

          {/* Purple Triangle */}
          <div className="absolute right-[5%] bottom-[18%] hidden md:block">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80.146"
                  height="80.146"
                  viewBox="0 0 80.146 80.146"
              >
                  <path
                      d="M32.375,15.073a13,13,0,0,1,21.251,0L71.556,40.51A13,13,0,0,1,60.931,61H25.069A13,13,0,0,1,14.444,40.51Z"
                      transform="translate(-15.28 45.531) rotate(-45)"
                      fill="#717cff"
                  />
              </svg>
          </div>

          {/* Left Purple Triangle */}
          <div className="absolute left-[3%] bottom-[40%] hidden md:block">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="49.679"
                  height="49.679"
                  viewBox="0 0 49.679 49.679"
              >
                  <path
                      d="M19.9,14.949a13,13,0,0,1,21.207,0l5.341,7.53A13,13,0,0,1,35.841,43H25.159a13,13,0,0,1-10.6-20.521Z"
                      transform="translate(-15.278 27.855) rotate(-45)"
                      fill="#717cff"
                  />
              </svg>
          </div>

          {/* Green Circle */}
          <motion.div
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
              className="absolute left-[8%] bottom-[15%] hidden md:block"
          >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 124 124"
              >
                  <circle cx="62" cy="62" r="62" fill="#4db6ac" />
              </svg>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-[1280px] mx-auto px-8">
              <div className="pt-[20vh] lg:pt-0 flex flex-col-reverse lg:flex-row items-center justify-center gap-[6vw]">
                  {/* Illustration */}
                  <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      viewport={{ once: true }}
                      className="relative w-[34vw] min-w-[320px] max-w-[460px] aspect-square"
                  >
                      {/* Blue Blob */}
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 534.48 541"
                          className="absolute inset-0 w-full h-full"
                      >
                          <path
                              d="M282.818,541c153.811,0,180.5-116,241.5-278.5S358.13,0,204.318,0s-223,134.5-200,262.5S129.007,541,282.818,541Z"
                              fill="#717cff"
                          />
                      </svg>

                      {/* Main Illustration */}
                      <img
                          src={Ok}
                          alt="illustration"
                          className="absolute inset-0 z-10 w-[72%] h-[72%] object-contain m-auto"
                      />
                  </motion.div>

                  {/* Text Content */}
                  <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      viewport={{ once: true }}
                      className="w-[38vw] min-w-[320px] max-w-[520px] text-right z-50"
                  >
                      <p className="mt-[-30px] text-[clamp(18px,1.3vw,24px)] leading-[2.3] text-[#696969] font-medium">
                          در آپارمو همه چیز ساده و قابل فهم طراحی شده است
                          <br />
                          از مدیر تا ساکن، در هر رده سنی، می‌توانند با چند کلیک
                          کارها را انجام دهند. ساکنین بدون آموزش خاصی می‌توانند
                          خرابی ثبت کنند و وضعیت را ببینند، و مدیر ساختمان از یک
                          پنل واضح و منظم همه چیز را مدیریت می‌کند
                      </p>
                  </motion.div>
              </div>
          </div>
      </section>
  );
}

export default TopSection