import clsx from "clsx";
import { useState } from "react";

const AboutUs = () => {
  const [selected, setSelected] = useState("about");
  return (
    <div className="rounded bg-dark p-5">
      <ul className="nav nav-pills d-flex gap-2 flex-sm-row flex-column justify-content-between mb-3">
        <li
          onClick={() => setSelected("about")}
          className="nav-item w-100 d-flex flex-1"
        >
          <p
            className={clsx(
              "nav-link text-uppercase text-center w-100",
              selected === "about" && "active"
            )}
          >
            About Us
          </p>
        </li>
        <li
          onClick={() => setSelected("choose")}
          className="nav-item w-100 d-flex flex-1"
        >
          <p
            className={clsx(
              "nav-link text-uppercase text-center w-100",
              selected === "choose" && "active"
            )}
          >
            Why Choose Us
          </p>
        </li>
      </ul>
      <div className="tab-content">
        {selected === "about" && (
          <div className="">
            <p className="text-secondary mb-0">
              Helios 24X7 isn't just a gym; it's a lifestyle. Step into a world
              where fitness knows no bounds, where the pursuit of excellence is
              a 24/7 endeavor. With our commitment to providing unparalleled
              service, cutting-edge equipment, and a vibrant atmosphere, Helios
              24X7 stands as the pinnacle of fitness in Bareilly.
            </p>
          </div>
        )}
        {selected === "choose" && (
          <div className="">
            <p className="text-secondary mb-0">
              + 24/7 Access <br />
              + International Standard Equipment <br />
              + Elite Trainers <br />
              + Cutting-Edge Technology <br />
              + Vibrant Community Atmosphere <br />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
