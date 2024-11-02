import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import PageTitle from '../../components/PageTitle';
import RelatedProducts from '../../components/RelatedProducts';
import { Product } from '../../types';

interface ShopDetailProps {
  dataProductDetail: Product | null;
  dataRelatedProducts: Product[] | null;
}

const ShopDetail: NextPage<ShopDetailProps> = ({ dataProductDetail, dataRelatedProducts }) => {
  return dataProductDetail && dataRelatedProducts ? (
    <>
      <Head>
        <title>Store - Shop Detail</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle title={dataProductDetail.title} />

      <section className="sec-product-detail bg0 p-t-65 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-7 p-b-30">
              <div className="p-r-30 p-lr-0-lg">
                <div className="wrap-slick3 flex-sb flex-w">
                  <div className="slick3 gallery-lb">
                    <div className="item-slick3">
                      <div className="wrap-pic-w pos-relative">
                        <img src={dataProductDetail.img} alt={dataProductDetail.title} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-5 p-b-30">
              <div className="p-r-50 p-t-5 p-lr-0-lg">
                <h4 className="mtext-105 cl2 js-name-detail p-b-14">{dataProductDetail.title}</h4>

                <span className="mtext-106 cl2">{dataProductDetail.price}</span>

                <p className="stext-102 cl3 p-t-23">{dataProductDetail.description}</p>

                <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                  <div className="flex-m bor9 p-r-10 m-r-11">
                    <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
                      <i className="zmdi zmdi-favorite"></i>
                    </a>
                  </div>

                  <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Facebook">
                    <i className="fa fa-facebook"></i>
                  </a>

                  <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Twitter">
                    <i className="fa fa-twitter"></i>
                  </a>

                  <a href="#" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Google Plus">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bor10 m-t-50 p-t-43 p-b-40">
            <div className="tab01">
              <div className="tab-content p-t-43">
                <div className="tab-pane fade show active" id="description" role="tabpanel">
                  <div className="how-pos2 p-lr-15-md">
                    <p className="stext-102 cl6">{dataProductDetail.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
          <span className="stext-107 cl6 p-lr-25">Free shipping - only today</span>
        </div>
      </section>

      <RelatedProducts dataRelatedProducts={dataRelatedProducts} />
    </>
  ) : (
    <div>
      <h4>Product not found.</h4>
    </div>
  );
};

export default ShopDetail;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`http://localhost:5001/products`);
  const data: Product[] = await res.json();
  const limit = 4;

  let randomNo;
  let validRangeFound = false;

  if (params) {
    while (!validRangeFound) {
      randomNo = Math.floor(Math.random() * (data.length - limit + 1));

      validRangeFound = randomNo + limit <= data.length;
    }

    const resProductDetail = await fetch(`http://localhost:5001/products/${params.id}`);
    const dataProductDetail: Product = await resProductDetail.json();

    const resRelatedProducts = await fetch(`http://localhost:5001/products?_start=${randomNo}&_limit=${limit}`);
    const dataRelatedProducts: Product[] = await resRelatedProducts.json();

    return {
      props: {
        dataProductDetail,
        dataRelatedProducts,
      },
    };
  }

  return {
    props: {
      dataProductDetail: null,
      dataRelatedProducts: null,
    },
  };
};