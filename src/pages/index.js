import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/nen-tang-dien/dinh-luat-ohm">
            Bắt đầu học ngay - 5 phút ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Trang chủ | ${siteConfig.title}`}
      description="Hướng dẫn lập trình PIC và thiết kế mạch điện tử">
      <HomepageHeader />
      <main>
        {/* Bạn có thể thêm nội dung giới thiệu ở đây sau */}
      </main>
    </Layout>
  );
}