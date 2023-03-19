// Code Developed By Renato
// email:20099697@mail.wit.ie

// controller to render index view
export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About Placemark",
        };
        return h.view("about-view", viewData);
      },
    },
  };
  