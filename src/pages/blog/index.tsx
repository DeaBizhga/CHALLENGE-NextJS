import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import BlogItem from '../../components/BlogItem';
import PageTitle from '../../components/PageTitle';
import { BlogData } from '../../types';
import { useRouter } from 'next/router';

interface BlogProps {
  dataBlogs: BlogData[];
}

const Blog: NextPage<BlogProps> = ({ dataBlogs }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();

  const handleCategory = (filter: string) => {
    router.push({
      pathname: '/blog',
      query: { ...router.query, category: filter },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push({
      pathname: '/blog',
      query: { ...router.query, searchTerm: searchValue },
    });

    setSearchValue('');
  };

  return (
    <>
      <Head>
        <title>Store - Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle title="Blog" />

      <section className="bg0 p-t-62 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                {/* blog item */}
                {dataBlogs.length > 0 ? (
                  dataBlogs.map((blog) => {
                    return <BlogItem key={blog.id} blogData={blog} />;
                  })
                ) : (
                  <p>There are no results with your search.</p>
                )}
              </div>
            </div>

            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <form className="bor17 of-hidden pos-relative" onSubmit={handleSubmit}>
                  <input
                    className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55"
                    type="text"
                    name="search"
                    value={searchValue}
                    placeholder="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />

                  <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                    <i className="zmdi zmdi-search"></i>
                  </button>
                </form>

                <div className="p-t-55">
                  <h4 className="mtext-112 cl2 p-b-33">Categories</h4>

                  <ul>
                    <li className="bor18">
                      <button className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4" onClick={() => handleCategory('fashion')}>
                        Fashion
                      </button>
                    </li>

                    <li className="bor18">
                      <button className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4" onClick={() => handleCategory('beauty')}>
                        Beauty
                      </button>
                    </li>

                    <li className="bor18">
                      <button className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4" onClick={() => handleCategory('streetstyle')}>
                        Street Style
                      </button>
                    </li>

                    <li className="bor18">
                      <button className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4" onClick={() => handleCategory('lifestyle')}>
                        Life Style
                      </button>
                    </li>

                    <li className="bor18">
                      <button className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4" onClick={() => handleCategory('diy')}>
                        DIY & Crafts
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let url: string;

  if (query.category && query.searchTerm) {
    url = `http://localhost:5001/blogs?category_like=${query.category}&q=${query.searchTerm}`;
  } else if (query.category) {
    url = `http://localhost:5001/blogs?category_like=${query.category}`;
  } else if (query.searchTerm) {
    url = `http://localhost:5001/blogs?q=${query.searchTerm}`;
  } else {
    url = `http://localhost:5001/blogs`;
  }

  const resBlogs = await fetch(url);
  const dataBlogs: BlogData[] = await resBlogs.json();

  return {
    props: {
      dataBlogs,
    },
  };
};
