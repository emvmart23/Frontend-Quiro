import useTitle from "@/hooks/useTitle";
import CardService from "../components/CardService";

export default function Services() {
  useTitle("Servicios")

  const services = [
    {
      id: 1,
      title: 'Nombre de Service A',
      description: 'Una descripción del servicio para los visitantes.',
      price: 120,
      image: "https://static.wixstatic.com/media/nsplsh_81195f4c7ab54054ae4f6d272bc13462~mv2.jpg/v1/fill/w_469,h_392,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/nsplsh_81195f4c7ab54054ae4f6d272bc13462~mv2.jpg"
    },
    {
      id: 2,
      title: 'Nombre de Service B',
      description: 'Una descripción del servicio para los visitantes.',
      price: 120,
      image: "https://static.wixstatic.com/media/cda177_56ea050767e144cc9e64ab0149fe8839~mv2_d_5616_3137_s_4_2.jpg/v1/fill/w_469,h_392,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/cda177_56ea050767e144cc9e64ab0149fe8839~mv2_d_5616_3137_s_4_2.jpg"
    },
    {
      id: 3,
      title: 'Nombre de Service C',
      description: 'Una descripción del servicio para los visitantes.',
      price: 120,
      image: "https://static.wixstatic.com/media/4b62b34c8f1e4dab94d466d1c57d22e7.jpg/v1/fill/w_469,h_392,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/4b62b34c8f1e4dab94d466d1c57d22e7.jpg"
    },
    {
      id: 4,
      title: 'Nombre de Service D',
      description: 'Una descripción del servicio para los visitantes.',
      price: 120,
      image: "https://static.wixstatic.com/media/nsplsh_81195f4c7ab54054ae4f6d272bc13462~mv2.jpg/v1/fill/w_469,h_392,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/nsplsh_81195f4c7ab54054ae4f6d272bc13462~mv2.jpg"
    },
    {
      id: 5,
      title: 'Nombre de Service E',
      description: 'Una descripción del servicio para los visitantes.',
      price: 120,
      image: "https://static.wixstatic.com/media/cda177_56ea050767e144cc9e64ab0149fe8839~mv2_d_5616_3137_s_4_2.jpg/v1/fill/w_469,h_392,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/cda177_56ea050767e144cc9e64ab0149fe8839~mv2_d_5616_3137_s_4_2.jpg"
    },
    {
      id: 6,
      title: 'Nombre de Service F',
      description: 'Una descripción del servicio para los visitantes.',
      price: 120,
      image: "https://static.wixstatic.com/media/4b62b34c8f1e4dab94d466d1c57d22e7.jpg/v1/fill/w_469,h_392,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/4b62b34c8f1e4dab94d466d1c57d22e7.jpg"
    },
    {
      id: 7,
      title: 'Nombre de Service G',
      description: 'Una descripción del servicio para los visitantes.',
      price: 120,
      image: "https://static.wixstatic.com/media/4b62b34c8f1e4dab94d466d1c57d22e7.jpg/v1/fill/w_469,h_392,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/4b62b34c8f1e4dab94d466d1c57d22e7.jpg"
    },
  ];

  return (
    <section className="flex flex-col gap-8 w-full px-52">

      <div className="flex flex-col gap-2 self-center">
        <h1 className="text-4xl font-medium text-center text-primary">Servicios</h1>
        <h4 className="text-lg font-light text-center">Relájate y renueva tu energía.</h4>
      </div>

      <div
        className="
          grid pt-4
          grid-cols-1 gap-4
          xl:grid-cols-2 xl:gap-8
          2xl:grid-cols-3 2xl:gap-12
          justify-items-center"
      >
        {services.map((service)=>(
          <CardService
            key={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            image={service.image}
          />
        ))}
      </div>

    </section>
  );
}
