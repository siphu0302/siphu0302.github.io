import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

const TOPICS = [
  {
    title: '1. Nền tảng Điện & Mạch cơ bản',
    description:
      'Nắm chắc Định luật Ohm, Định luật Kirchhoff (KCL & KVL), mạch phân áp và cách bảo vệ chân I/O an toàn.',
    link: '/docs/1-nen-tang-dien/1-dinh-luat-ohm',
  },
  {
    title: '2. Thực hành tính toán mạch',
    description:
      'Áp dụng công thức vào bài toán thực tế như chọn điện trở hạn dòng cho LED và chia áp đọc tín hiệu ADC.',
    link: '/docs/1-nen-tang-dien/2-dinh-luat-kirchhoff',
  },
  {
    title: '3. Vi điều khiển PIC & Ngoại vi',
    description:
      'Ghi chép hành trình thực hành với vi điều khiển PIC, kết nối cảm biến, hiển thị và các mạch điều khiển.',
    link: '/docs/intro',
  },
];

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Ghi chép thực hành Điện nền tảng và Vi điều khiển PIC theo hướng trực quan, dễ hiểu.">
      <header className="heroBannerCustom">
        <div className="container">
          <span
            style={{
              display: 'inline-block',
              padding: '0.3rem 0.85rem',
              marginBottom: '0.9rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: 'rgba(56, 189, 248, 0.16)',
              border: '1px solid rgba(125, 211, 252, 0.35)',
              color: '#bae6fd',
            }}>
            Sổ tay thực hành • Điện nền tảng & Vi điều khiển PIC
          </span>

          <h1>{siteConfig.title || 'Blog Điện & Vi điều khiển PIC'}</h1>

          <p>
            {siteConfig.tagline ||
              'Hành trình tự học từ nền tảng điện mạch đến thực hành vi điều khiển PIC — trình bày gọn gàng, dễ tra cứu và gắn liền với bài toán thực tế.'}
          </p>

          <div className="heroActions">
            <Link
              className="button button--primary button--lg"
              to="/docs/1-nen-tang-dien/1-dinh-luat-ohm">
              Bắt đầu từ Định luật Ohm
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro">
              Xem toàn bộ tài liệu
            </Link>
          </div>
        </div>
      </header>

      <main className="topicSection">
        <h2>Lộ trình học tập</h2>
        <div className="topicGrid">
          {TOPICS.map((topic) => (
            <Link
              key={topic.title}
              to={topic.link}
              style={{textDecoration: 'none', color: 'inherit'}}>
              <div className="topicCard">
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}