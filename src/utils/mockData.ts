import { mock } from "intermock";
import { ProductData } from "@/database/interfaces/_Product";

interface MockProduct {
    name: string;
    description: string;
    details: string;
    categoryIds: number[];
    price: number;
    stock: number;
    sold: number;
    salePercentage: number;
    images: string[];
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  function generateMockProducts(count: number): MockProduct[] {
    const products: MockProduct[] = [];
    
    for (let i = 0; i < count; i++) {
      products.push({
        name: `${i + 1}`,
        description: `${i + 1}`,
        details: `${i + 1}`,
        categoryIds: [1, 2],
        price: Math.floor(Math.random() * 1000) + 100,
        stock: Math.floor(Math.random() * 100),
        sold: Math.floor(Math.random() * 50),
        salePercentage: Math.floor(Math.random() * 100),
        images: [`${i + 1}`],
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  
    return products;
  }

  function renderProducts(products: MockProduct[]): void {
    const productsContainer = document.querySelector('.products') as HTMLElement;
    productsContainer.innerHTML = '';
  
    products.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}">
        <div class="info">
          <div class="name">${product.name}</div>
          <div class="price">${product.price} VND</div>
        </div>
      `;
      productsContainer.appendChild(productElement);
    });
  }

  function setupSearch(): void {
    const searchInput = document.querySelector('.search input') as HTMLInputElement;
  
    searchInput.addEventListener('input', function (e: Event) {
      const target = e.target as HTMLInputElement; // Chỉ định kiểu cho target
      if (target) { // Kiểm tra để đảm bảo target không null
        const searchText = target.value.trim().toLowerCase(); // Sử dụng target.value an toàn
        const productElements = document.querySelectorAll('.product') as NodeListOf<HTMLElement>;
  
        productElements.forEach((product) => {
          const isVisible = product.innerText.toLowerCase().includes(searchText);
          product.classList.toggle('hide', !isVisible);
        });
      }
    });
  }

  
  