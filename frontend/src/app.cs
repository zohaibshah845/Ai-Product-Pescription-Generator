.App {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

/* Header Styles */
.header {
  background: rgba(255, 255, 255, 0.95);
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.header h1 span {
  color: #667eea;
}

.header-badge {
  background: #667eea;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
}

/* Product Form Styles */
.product-form {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.product-form h2 {
  margin-top: 0;
  margin-bottom: 25px;
  color: #333;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
  font-size: 14px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.form-group small {
  display: block;
  margin-top: 5px;
  color: #999;
  font-size: 12px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.product-form button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-form button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.product-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Description Preview Styles */
.description-preview {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.description-preview h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

.description-placeholder {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.description-placeholder .icon {
  font-size: 50px;
  margin-bottom: 15px;
}

.description-content {
  animation: fadeIn 0.5s ease;
}

.description-content h3 {
  color: #333;
  margin-top: 0;
  font-size: 20px;
}

.description-content .description-text {
  color: #555;
  line-height: 1.8;
  margin: 15px 0;
}

.description-content ul {
  padding-left: 20px;
  margin: 15px 0;
}

.description-content ul li {
  color: #555;
  margin-bottom: 8px;
  line-height: 1.6;
}

.description-content .keywords {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.description-content .keywords strong {
  color: #333;
}

.description-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.description-actions button {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-copy {
  background: #667eea;
  color: white;
}

.btn-copy:hover {
  background: #5a6fd6;
}

.btn-save {
  background: #28a745;
  color: white;
}

.btn-save:hover {
  background: #218838;
}

/* Footer Styles */
.footer {
  background: rgba(255, 255, 255, 0.95);
  padding: 20px 0;
  margin-top: auto;
  text-align: center;
  color: #666;
}

.footer a {
  color: #667eea;
  text-decoration: none;
}

/* Loading Spinner */
.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    padding: 10px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .header h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }
}