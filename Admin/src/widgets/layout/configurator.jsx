import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
} from "@/context";

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType } = controller;

  const sidenavColors = {
    dark: "from-black to-black border-gray-200",
    white: "from-gray-100 to-gray-100 border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  return (
    <aside
      className={`fixed top-0 right-0 z-[60] h-screen w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        openConfigurator ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Dashboard Configurator
          </Typography>
          <Typography className="font-normal text-blue-gray-600 text-sm">
            See our dashboard options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="py-4 px-6">
        {/* Sidenav Colors */}
        <div className="mb-10">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Sidenav Colors
          </Typography>
          <div className="flex items-center gap-2 flex-wrap">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full shadow border bg-gradient-to-br ${sidenavColors[color]} transition-transform hover:scale-110 ${
                  sidenavColor === color ? "border-black" : "border-transparent"
                }`}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </div>
        </div>

        {/* Sidenav Type */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Sidenav Types
          </Typography>
          <Typography variant="small" className="text-gray-600 mb-2">
            Choose between 2 different sidenav types.
          </Typography>
          <div className="flex gap-2">
            <Button
              variant={sidenavType === "gray" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "gray")}
            >
              Dark
            </Button>
            <Button
              variant={sidenavType === "white" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "white")}
            >
              White
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
