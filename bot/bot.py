from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Разрешаем CORS для всех доменов

# Конфигурация Telegram бота
BOT_TOKEN = "8486542715:AAEO26HqgmttbL9KX40ectdbHDCOL5aKxFw"
CHAT_ID = "-1003146277173"
TELEGRAM_API_URL = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

@app.route('/send_telegram', methods=['POST'])
def send_telegram():
    try:
        # Получаем данные из формы
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'error': 'Нет данных'}), 400
        
        name = data.get('name', '').strip()
        phone = data.get('phone', '').strip()
        reason = data.get('reason', '').strip()
        
        # Проверяем обязательные поля
        if not name or not phone or not reason:
            return jsonify({'success': False, 'error': 'Имя, телефон и причина обязательны'}), 400
        
        # Получаем текущее время
        current_time = datetime.now().strftime("%d.%m.%Y %H:%M")
        
        # Словарь для преобразования значений reason
        reason_dict = {
            'consultation': 'Консультация',
            'training': 'Запись на обучение',
            'qualification': 'Повышение квалификации',
            'legal': 'Правовая помощь',
            'documents': 'Вопрос по документам',
            'other': 'Другое'
        }
        
        # Получаем читаемое название причины
        reason_text = reason_dict.get(reason, reason)
        
        # Формируем сообщение
        message = f"""📞 НОВАЯ ЗАЯВКА С САЙТА
👤 Имя: {name}
📱 Телефон: {phone}
🎯 Цель: {reason_text}
🕓 Время: {current_time}"""
        
        # Отправляем сообщение в Telegram
        telegram_data = {
            'chat_id': CHAT_ID,
            'text': message,
            'parse_mode': 'HTML'
        }
        
        response = requests.post(TELEGRAM_API_URL, data=telegram_data, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if result.get('ok'):
                return jsonify({'success': True})
            else:
                return jsonify({'success': False, 'error': 'Ошибка отправки в Telegram'}), 500
        else:
            return jsonify({'success': False, 'error': 'Ошибка соединения с Telegram'}), 500
            
    except requests.exceptions.Timeout:
        return jsonify({'success': False, 'error': 'Таймаут соединения'}), 500
    except requests.exceptions.RequestException as e:
        return jsonify({'success': False, 'error': f'Ошибка сети: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'success': False, 'error': f'Внутренняя ошибка: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Проверка работоспособности сервера"""
    return jsonify({'status': 'ok', 'message': 'Сервер работает'})

if __name__ == '__main__':
    print("🚀 Запуск Telegram бота...")
    print(f"📱 Бот токен: {BOT_TOKEN[:10]}...")
    print(f"💬 Чат ID: {CHAT_ID}")
    print("🌐 Сервер будет доступен на http://localhost:5000")
    print("📞 Эндпоинт для отправки: http://localhost:5000/send_telegram")
    print("❤️ Проверка здоровья: http://localhost:5000/health")
    
    app.run(host='localhost', port=5000, debug=True)
